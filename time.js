(() => {
    const body = document.body;
    const menuToggle = document.querySelector('[data-menu-toggle]');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            const isOpen = body.classList.toggle('sidebar-open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    const gameFrame = document.querySelector('[data-game-frame]');
    if (gameFrame) {
        const originalSrc = gameFrame.getAttribute('data-src') || gameFrame.getAttribute('src');
        const refreshBtn = document.querySelector('[data-game-refresh]');
        const fullscreenBtn = document.querySelector('[data-game-fullscreen]');

        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                if (!originalSrc) return;
                gameFrame.src = '';
                setTimeout(() => {
                    gameFrame.src = originalSrc;
                }, 20);
            });
        }

        if (fullscreenBtn && gameFrame.requestFullscreen) {
            fullscreenBtn.addEventListener('click', () => {
                gameFrame.requestFullscreen().catch(() => {});
            });
        }
    }

    const timeEls = document.querySelectorAll('[data-time]');
    const dateEls = document.querySelectorAll('[data-date]');

    if (!timeEls.length && !dateEls.length) {
        return;
    }

    const timeFormatter = new Intl.DateTimeFormat(undefined, {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
    });

    const dateFormatter = new Intl.DateTimeFormat(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    function updateDateTime() {
        const now = new Date();
        const timeText = timeFormatter.format(now);
        const dateText = dateFormatter.format(now);

        timeEls.forEach((el) => (el.textContent = timeText));
        dateEls.forEach((el) => (el.textContent = dateText));
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
})();
