const CACHE_NAME = 'price-checker-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './data.json'
];

// Install service worker and cache files
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache).catch(err => {
          console.log('Cache addAll error:', err);
        });
      })
  );
  self.skipWaiting();
});

// Serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('Serving from cache:', event.request.url);
          return response;
        }
        console.log('Fetching from network:', event.request.url);
        return fetch(event.request).then(networkResponse => {
          // Cache the fetched response for future use
          if (event.request.url.indexOf('http') === 0 && networkResponse.status === 200) {
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          }
          return networkResponse;
        });
      })
      .catch(err => {
        console.log('Fetch error:', err);
        // You can return a custom offline page here if needed
      })
  );
});

// Clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Listen for messages to update cache
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'UPDATE_CACHE') {
    console.log('Updating cache on demand');
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(urlsToCache);
    });
  }
});
