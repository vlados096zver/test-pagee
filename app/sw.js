self.addEventListener("install", () => {
  return true;
});

self.addEventListener("activate", () => {
  return true;
});

self.addEventListener("sync", () => {
  return true;
});

self.addEventListener("fetch", () => {
  return true;
});

self.addEventListener("push", function (event) {
  const { title, ...options } = event.data.json();
  self.registration.showNotification(title, options);
  const data = {...options.data, event: 'show'}
  fetch(event.target.registration.scope + "web-pushes/events", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return true;
});

self.addEventListener("notificationclick", function (event) {
  const data = {...event.notification.data, event: 'click'}
  fetch(event.target.registration.scope + "web-pushes/events", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  event.notification.close();
  event.waitUntil(clients.openWindow(data.url));
  return true;
});

self.addEventListener("notificationclose", function (event) {
  const data = {...event.notification.data, event: 'capped'}
  fetch(event.target.registration.scope + "web-pushes/events", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return true;
});
