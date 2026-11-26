import { useCookieConsentStore } from "@/stores/cookie-consent-store";

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";

type AnalyticsWindow = Window & {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
};

let configured = false;

function getAnalyticsWindow() {
    return window as AnalyticsWindow;
}

export function setAnalyticsConsent(allowed: boolean) {
    if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;

    const analyticsWindow = getAnalyticsWindow();

    Object.assign(window, {
        [`ga-disable-${GA_MEASUREMENT_ID}`]: !allowed,
    });

    if (!allowed) {
        analyticsWindow.gtag?.("consent", "update", {
            analytics_storage: "denied",
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
        });
        return;
    }

    if (!analyticsWindow.gtag) {
        analyticsWindow.dataLayer ??= [];

        analyticsWindow.gtag = function (...args: unknown[]) {
            analyticsWindow.dataLayer!.push(args);
        };
    }

    const gtag = analyticsWindow.gtag;

    if (!configured) {
        gtag("consent", "default", {
            analytics_storage: "denied",
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
        });
    }

    gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
    });

    if (configured) return;

    gtag("js", new Date());

    let referrer = "";

    try {
        const url = new URL(document.referrer);
        referrer = `${url.origin}${url.pathname}`;
    } catch {
        // Direct visits have no referrer.
    }

    gtag("config", GA_MEASUREMENT_ID, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        page_location: `${window.location.origin}${window.location.pathname}`,
        page_referrer: referrer,
    });

    configured = true;

    if (!document.getElementById("eckert-google-analytics")) {
        const script = document.createElement("script");

        script.id = "eckert-google-analytics";
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;

        document.head.appendChild(script);
    }
}

export function trackEvent(
    name: "page_view" | "phone_click" | "generate_lead",
    parameters: Record<string, string | number | boolean> = {},
) {
    if (typeof window === "undefined" || !configured || useCookieConsentStore.getState().consent !== "all") {
        return;
    }

    getAnalyticsWindow().gtag?.("event", name, {
        ...parameters,
        send_to: GA_MEASUREMENT_ID,
    });
}
