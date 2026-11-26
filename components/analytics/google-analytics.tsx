"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { useCookieConsentStore } from "@/stores/cookie-consent-store";
import {
    GA_MEASUREMENT_ID,
    setAnalyticsConsent,
    trackEvent,
} from "@/lib/analytics";

export default function GoogleAnalytics() {
    const pathname = usePathname();
    const consent = useCookieConsentStore((state) => state.consent);
    const lastPage = useRef<string | null>(null);

    useEffect(() => {
        // Apply withdrawals immediately when the store changes.
        return useCookieConsentStore.subscribe((state, previous) => {
            if (state.consent !== previous.consent && state.consent !== "all") {
                setAnalyticsConsent(false);
                lastPage.current = null;
            }
        });
    }, []);

    useEffect(() => {
        if (!/^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID)) return;

        const allowed = consent === "all";
        setAnalyticsConsent(allowed);

        if (!allowed) {
            lastPage.current = null;
            return;
        }

        if (!pathname || lastPage.current === pathname) return;

        lastPage.current = pathname;

        // Exclude query strings and fragments from analytics URLs.
        trackEvent("page_view", {
            page_location: `${window.location.origin}${pathname}`,
            page_path: pathname,
        });
    }, [consent, pathname]);

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (!(event.target instanceof Element)) return;

            const link = event.target.closest<HTMLAnchorElement>(
                'a[href^="tel:"]',
            );

            if (!link) return;

            trackEvent("phone_click", {
                page_path: window.location.pathname,
            });
        }

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return null;
}