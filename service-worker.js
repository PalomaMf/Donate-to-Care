var cacheName = 'Donate to Care'

self.addEventListener('install', event =>{
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll([
                'index.html',
                'Contact.html',
                'About.html',
                'Post.html',

                './assets/img/About-bg.jpg',
                './assets/img/contact-bg.jpg',
                './assets/img/home-bg.jpg',
                './assets/img/post-bg.jpg',
                './assets/img/post-sample-image.jpg',

                './assets/css/styles.css',

                './assets/js/scripts.js',




            ]))
    );
});


self.addEventListener('message', function(event){
    if(event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});

self.addEventListener('fetch', function (event){
    event.repondWith(async function(){
        try {
            return await fetch(event.request);
        } catch (err){
            return caches.match(event.request);
        }
    }());

    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if(response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});