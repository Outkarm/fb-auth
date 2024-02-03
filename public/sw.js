importScripts(
    'https://cdn.jsdelivr.net/npm/react-toastify/dist/react-toastify.min.js'
);
self.addEventListener('fetch', (event) => {
    // Process fetch event
});

self.addEventListener('message', (event) => {
    const data = event.data;
    if (data.type === 'toast') {
        const { message, options } = data.payload;
        toast[options.type](message, options);
    }
});
