"use client";

import { forwardRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

export type { TurnstileInstance };

interface TurnstileFieldProps {
    action: "contact" | "parts";
}

const TurnstileField = forwardRef<TurnstileInstance, TurnstileFieldProps>(function TurnstileField({ action }, ref) {
    const [error, setError] = useState(false);
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();

    if (!siteKey) {
        return (
            <p role="alert" className="mt-6 text-sm text-destructive">
                Form verification is unavailable. Please call (407) 629-7968.
            </p>
        );
    }

    return (
        <div className="mt-6 space-y-2">
            <Turnstile
                ref={ref}
                siteKey={siteKey}
                options={{
                    action,
                    theme: "auto",
                    size: "flexible",
                    refreshExpired: "auto",
                }}
                onSuccess={() => setError(false)}
                onError={() => setError(true)}
            />

            {error && (
                <p role="alert" className="text-sm text-destructive">
                    Verification could not load. Check your connection or refresh the page.
                </p>
            )}
        </div>
    );
});

export default TurnstileField;
