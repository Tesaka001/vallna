"use client";

import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { NotificationPreference } from "@/lib/supabase/types";
import {
  SERVICE_WORKER_PATH,
  SERVICE_WORKER_SCOPE,
} from "@/lib/pwa/constants";

const PREFERENCE_OPTIONS: {
  value: NotificationPreference;
  label: string;
  description: string;
}[] = [
  {
    value: "both",
    label: "Email and push",
    description: "Receive reports by email and browser notification.",
  },
  {
    value: "email",
    label: "Email only",
    description: "Reports arrive in your inbox when generated.",
  },
  {
    value: "push",
    label: "Push only",
    description: "Browser notifications when you enable them below.",
  },
  {
    value: "none",
    label: "In-app only",
    description: "No email or push — view reports in Vallna.",
  },
];

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function NotificationSettings({
  initialPreference,
}: {
  initialPreference: NotificationPreference;
}) {
  const [preference, setPreference] =
    useState<NotificationPreference>(initialPreference);
  const [savingPreference, setSavingPreference] = useState(false);
  const [pushSupported, setPushSupported] = useState(false);
  const [pushConfigured, setPushConfigured] = useState(false);
  const [pushSubscribed, setPushSubscribed] = useState(false);
  const [pushLoading, setPushLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refreshPushState = useCallback(async () => {
    setPushLoading(true);
    setError(null);

    const supported =
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      "PushManager" in window &&
      "Notification" in window;

    setPushSupported(supported);

    if (!supported) {
      setPushConfigured(false);
      setPushSubscribed(false);
      setPushLoading(false);
      return;
    }

    try {
      const keyRes = await fetch("/api/notifications/push/vapid-key");
      const keyData = (await keyRes.json()) as {
        configured?: boolean;
        publicKey?: string | null;
      };

      setPushConfigured(Boolean(keyData.configured && keyData.publicKey));

      const registration = await navigator.serviceWorker.getRegistration(
        SERVICE_WORKER_PATH,
      );
      if (!registration) {
        setPushSubscribed(false);
        setPushLoading(false);
        return;
      }

      const subscription = await registration.pushManager.getSubscription();
      setPushSubscribed(Boolean(subscription));
    } catch {
      setError("Could not check push notification status.");
    } finally {
      setPushLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshPushState();
  }, [refreshPushState]);

  async function savePreference(next: NotificationPreference) {
    setSavingPreference(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notification_preference: next }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Could not save preference.");
      }

      setPreference(next);
      setMessage("Notification preference saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save preference.");
    } finally {
      setSavingPreference(false);
    }
  }

  async function enablePush() {
    setMessage(null);
    setError(null);

    if (!pushSupported) {
      setError("Push notifications are not supported in this browser.");
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setError("Notification permission was denied.");
        return;
      }

      const keyRes = await fetch("/api/notifications/push/vapid-key");
      const keyData = (await keyRes.json()) as {
        configured?: boolean;
        publicKey?: string | null;
      };

      if (!keyData.configured || !keyData.publicKey) {
        setError("Push notifications are not configured on the server.");
        return;
      }

      const registration = await navigator.serviceWorker.register(
        SERVICE_WORKER_PATH,
        { scope: SERVICE_WORKER_SCOPE },
      );
      await navigator.serviceWorker.ready;

      let subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            keyData.publicKey,
          ) as BufferSource,
        });
      }

      const json = subscription.toJSON();
      const res = await fetch("/api/notifications/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endpoint: json.endpoint,
          keys: json.keys,
        }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Could not save push subscription.");
      }

      setPushSubscribed(true);
      setMessage("Push notifications enabled.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not enable push.");
    }
  }

  async function disablePush() {
    setMessage(null);
    setError(null);

    try {
      const registration = await navigator.serviceWorker.getRegistration(
        SERVICE_WORKER_PATH,
      );
      const subscription = await registration?.pushManager.getSubscription();

      if (subscription) {
        const endpoint = subscription.endpoint;
        await subscription.unsubscribe();
        await fetch("/api/notifications/push/subscribe", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint }),
        });
      }

      setPushSubscribed(false);
      setMessage("Push notifications disabled.");
    } catch {
      setError("Could not disable push notifications.");
    }
  }

  const showPushControls =
    preference === "push" || preference === "both";

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Choose how Vallna delivers your reports when they are generated each day.
        </p>
      </div>

      <section className="flex flex-col gap-4 rounded-lg border border-border p-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-medium">Report delivery</h2>
          <p className="text-sm text-muted-foreground">
            Reports are always available in the app. This controls email and push only.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="notification-preference">Delivery preference</Label>
          <Select
            value={preference}
            onValueChange={(value) => {
              if (value) {
                void savePreference(value as NotificationPreference);
              }
            }}
            disabled={savingPreference}
          >
            <SelectTrigger id="notification-preference" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PREFERENCE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            {
              PREFERENCE_OPTIONS.find((option) => option.value === preference)
                ?.description
            }
          </p>
        </div>
      </section>

      {showPushControls && (
        <section className="flex flex-col gap-4 rounded-lg border border-border p-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-medium">Browser notifications</h2>
            <p className="text-sm text-muted-foreground">
              Enable push on this device to receive report alerts in your browser.
            </p>
          </div>

          {!pushSupported && (
            <p className="text-sm text-muted-foreground">
              Push is not available in this browser.
            </p>
          )}

          {pushSupported && !pushConfigured && !pushLoading && (
            <p className="text-sm text-muted-foreground">
              Push is not configured on the server yet. Email delivery still works when
              Resend is set up.
            </p>
          )}

          {pushSupported && pushConfigured && (
            <div className="flex flex-wrap items-center gap-3">
              <Button
                type="button"
                onClick={() => void enablePush()}
                disabled={pushSubscribed || pushLoading}
              >
                {pushSubscribed ? "Push enabled" : "Enable push on this device"}
              </Button>
              {pushSubscribed && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => void disablePush()}
                >
                  Disable push
                </Button>
              )}
            </div>
          )}
        </section>
      )}

      {message && <p className="text-sm text-muted-foreground">{message}</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
