/* src/registerServiceWorker.js */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        // Reload the page when new SW takes control
        window.location.reload();
    });

    window.addEventListener('load', () => {
        navigator.serviceWorker
        .register(`${process.env.BASE_URL}service-worker.js`)
        .then(registration => {
            console.log('ServiceWorker registered:', registration);

            // Check for updates
            registration.onupdatefound = () => {
                const newWorker = registration.installing;
                newWorker.onstatechange = () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    console.log('New content is available, refreshing...');
                    newWorker.postMessage({ type: 'SKIP_WAITING' });
                    }
                };
            };
        })
        .catch(error => {
            console.error('ServiceWorker registration failed:', error);
        });
    });
}
