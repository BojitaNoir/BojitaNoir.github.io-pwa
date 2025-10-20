const cacheName = 'cache-offline-v1';
const filesOffline = [
    './',
    './index.html',
    './pages/electronica.html',
    './pages/limpieza.html',
    './main.js',
    './manifest.json',
    './img/192.png',
    './img/512.png'
];
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            return cache.addAll(filesOffline);
        })
    );
});

self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then(resp => {
                    return resp;
                })
                .catch(() => {
                    return caches.open(cacheName).then(cache => {
                        // Try match the request, otherwise return cached index.html as fallback
                        return cache.match(event.request).then(matched => matched || cache.match('./index.html'));
                    });
                })
        );
    } else {
        // For other requests, try cache first then network
        event.respondWith(
            caches.match(event.request).then(cached => cached || fetch(event.request))
        );
    }
});
