const tg = window.Telegram.WebApp;

export function useWebApp() {
    const onClose = () => {
        tg.close();
    };

    return {
        onClose,
        tg,
        user: tg.initDataUnsafe?.user,
    };
}