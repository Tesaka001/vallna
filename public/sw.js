const CACHE_VERSION = "v1";
const STATIC_CACHE = `vallna-static-${CACHE_VERSION}`;

const PRECACHE_URLS = ["/", "/offline", "/manifest.webmanifest", "/icon-192", "/icon-512"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("vallna-static-") && key !== STATIC_CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  if (url.pathname.startsWith("/api/")) {
    return;
  }

  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok && response.type === "basic") {
          const clone = response.clone();
          void caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) {
          return cached;
        }

        if (request.mode === "navigate") {
          const offline = await caches.match("/offline");
          if (offline) {
            return offline;
          }
        }

        return Response.error();
      }),
  );
});

self.addEventListener("push", (event) => {
  let payload = { title: "Vallna", body: "Your report is ready.", url: "/" };

  try {
    payload = { ...payload, ...event.data?.json() };
  } catch {
    // Use defaults when payload is malformed.
  }

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: "/icon-192",
      badge: "/icon-192",
      data: { url: payload.url },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url ?? "/reports";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if ("focus" in client) {
          if ("navigate" in client && typeof client.navigate === "function") {
            void client.navigate(targetUrl);
          }
          return client.focus();
        }
      }
      return clients.openWindow(targetUrl);
    }),
  );
});
