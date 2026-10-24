// Firebase compat SDK for service worker
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// ⚠️ এখানে আপনার Firebase config বসান (index.html-এর মতোই)
const firebaseConfig = {
  apiKey: "AIzaSyDSw3vJtflbE69f9cBzgYGGoVENcHAlkRc",
  authDomain: "push-notification-300ec.firebaseapp.com",
  projectId: "push-notification-300ec",
  storageBucket: "push-notification-300ec.firebasestorage.app",
  messagingSenderId: "272847679695",
  appId: "1:272847679695:web:fcd1962d98d39ea61287ba",
  measurementId: "G-DD1JRXYH38"
};

const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Background message received:', payload);

  const title = payload.notification?.title || 'New notification';
  const options = {
    body: payload.notification?.body || '',
    icon: payload.notification?.icon || '/icon.png',
    badge: '/icon.png',
    data: payload.data || {}
  };

  self.registration.showNotification(title, options);
});

// Notification click → focus / open site
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
