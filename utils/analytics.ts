export const trackEvent = (
    eventName: string,
    params?: {
        event_category?: string;
        event_label?: string;
        value?: number;
        [key: string]: any;
    }
) => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', eventName, params);
    } else {
        console.log(`[Analytics] ${eventName}`, params);
    }
};
