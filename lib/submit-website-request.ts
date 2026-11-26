interface WebsiteRequest {
    formType: "contact" | "parts";
    turnstileToken: string;
    values: Record<string, string>;
}

export async function submitWebsiteRequest(request: WebsiteRequest): Promise<void> {
    const response = await fetch("/api/website-requests", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const result: unknown = await response.json().catch(() => null);

        const message =
            result !== null && typeof result === "object" && "error" in result && typeof result.error === "string"
                ? result.error
                : "Your request could not be submitted. Please try again.";

        throw new Error(message);
    }
}
