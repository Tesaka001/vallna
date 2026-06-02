"use client";

import { useEffect } from "react";

import {
  SERVICE_WORKER_PATH,
  SERVICE_WORKER_SCOPE,
} from "@/lib/pwa/constants";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("serviceWorker" in navigator) ||
      process.env.NODE_ENV === "development"
    ) {
      return;
    }

    void navigator.serviceWorker.register(SERVICE_WORKER_PATH, {
      scope: SERVICE_WORKER_SCOPE,
    });
  }, []);

  return null;
}
