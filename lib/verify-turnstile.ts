import { z } from "zod";

const verificationSchema = z.object({
    success: z.boolean(),
    hostname: z.string().optional(),
    action: z.string().optional(),
});

interface VerifyTurnstileOptions {
    token: string;
    action: "contact" | "parts";
    secret: string;
    allowedHostnames: string[];
}

export async function verifyTurnstile({
    token,
    action,
    secret,
    allowedHostnames,
}: VerifyTurnstileOptions): Promise<boolean> {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            secret,
            response: token,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
        throw new Error("Verification service unavailable.");
    }

    const result = verificationSchema.safeParse(await response.json());

    if (!result.success) {
        throw new Error("Invalid verification service response.");
    }

    return (
        result.data.success &&
        result.data.action === action &&
        typeof result.data.hostname === "string" &&
        allowedHostnames.includes(result.data.hostname.toLowerCase())
    );
}
