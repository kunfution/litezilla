const STATIC_CACHE_NAME = 'pixel-art-static-v1';
const DYNAMIC_CACHE_NAME = 'pixel-art-dynamic-v1';

// All the files that make up the "app shell"
const STATIC_ASSETS = [
  '/',
  'index.html',
  'index.css',
  'index.tsx'
];

// On install, cache the app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Pre-caching App Shell');
        return cache.addAll(STATIC_ASSETS);
      })
  );
});

// On activate, clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME) {
          console.log('[Service Worker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

// On fetch, use a cache-then-network strategy
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If the request is in the cache, return it
        if (response) {
          return response;
        }
        // Otherwise, fetch from the network
        return fetch(event.request).then(
          networkResponse => {
            // If we get a valid response, cache it and return it
            if(networkResponse && networkResponse.status === 200) {
                const responseToCache = networkResponse.clone();
                caches.open(DYNAMIC_CACHE_NAME)
                  .then(cache => {
                    // Only cache GET requests
                    if(event.request.method === 'GET') {
                        cache.put(event.request, responseToCache);
                    }
                  });
            }
            return networkResponse;
          }
        );
      })
  );
});
