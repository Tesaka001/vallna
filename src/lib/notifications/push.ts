import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import webpush from "web-push";

import type { Database } from "@/lib/supabase/types";

export function isPushConfigured(): boolean {
  return Boolean(
    process.env.VAPID_PRIVATE_KEY?.trim() &&
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY?.trim() &&
      process.env.VAPID_SUBJECT?.trim(),
  );
}

export function getVapidPublicKey(): string | null {
  return process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY?.trim() ?? null;
}

function configureWebPush(): void {
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT!,
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!,
  );
}

export async function sendReportPushToUser(
  supabase: SupabaseClient<Database>,
  userId: string,
  params: {
    title: string;
    body: string;
    url: string;
  },
): Promise<number> {
  if (!isPushConfigured()) {
    return 0;
  }

  configureWebPush();

  const { data: subscriptions } = await supabase
    .from("push_subscriptions")
    .select("id, endpoint, p256dh, auth")
    .eq("user_id", userId);

  if (!subscriptions?.length) {
    return 0;
  }

  const payload = JSON.stringify({
    title: params.title,
    body: params.body,
    url: params.url,
  });

  let sent = 0;
  const staleIds: string[] = [];

  for (const sub of subscriptions) {
    try {
      await webpush.sendNotification(
        {
          endpoint: sub.endpoint,
          keys: { p256dh: sub.p256dh, auth: sub.auth },
        },
        payload,
      );
      sent += 1;
    } catch (error) {
      const statusCode =
        error && typeof error === "object" && "statusCode" in error
          ? (error as { statusCode: number }).statusCode
          : null;

      if (statusCode === 404 || statusCode === 410) {
        staleIds.push(sub.id);
      }
    }
  }

  if (staleIds.length > 0) {
    await supabase.from("push_subscriptions").delete().in("id", staleIds);
  }

  return sent;
}
