import React from "react";

export const useWebApp = () => {
    const user = React.useMemo(() => {
        if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
            return window.Telegram.WebApp.initDataUnsafe.user?.username || null;
        }
        return null;
    }, []);

    return { user };
};