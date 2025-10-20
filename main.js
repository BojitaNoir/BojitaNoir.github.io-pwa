if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Try multiple relative paths so registration works on GitHub Pages subpaths
    const candidates = ['sw.js', './sw.js', '../sw.js', '/sw.js'];
        const tryRegister = (i = 0) => {
            if (i >= candidates.length) return console.log('Service Worker not registered');
            navigator.serviceWorker.register(candidates[i])
                .then(reg => console.log('Service Worker registered with', candidates[i], reg))
                .catch(() => tryRegister(i + 1));
        };
        tryRegister();
    });
}

    // Handle PWA install prompt
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        deferredPrompt = e;
        // Create an install button if it doesn't exist
        if (!document.getElementById('installBtn')) {
            const btn = document.createElement('button');
            btn.id = 'installBtn';
            btn.textContent = 'Instalar PWA';
            btn.style.position = 'fixed';
            btn.style.right = '16px';
            btn.style.bottom = '16px';
            btn.style.zIndex = 10000;
            btn.style.padding = '10px 14px';
            btn.style.background = '#2b6cb0';
            btn.style.color = 'white';
            btn.style.border = 'none';
            btn.style.borderRadius = '6px';
            btn.style.cursor = 'pointer';
            document.body.appendChild(btn);
            btn.addEventListener('click', async () => {
                btn.disabled = true;
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log('User response to the install prompt:', outcome);
                btn.remove();
                deferredPrompt = null;
            });
        }
    });