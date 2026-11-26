import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { verifyTurnstile } from "@/lib/verify-turnstile";
import { websiteRequestEmail } from "@/lib/email/website-request-template";

export const runtime = "nodejs";

const shortText = z.string().trim().max(300).default("");
const longText = z.string().trim().max(5000).default("");

const requestSchema = z.object({
    formType: z.enum(["contact", "parts"]),
    turnstileToken: z.string().trim().min(1).max(2048),
    values: z.object({
        firstName: z.string().trim().min(1).max(100),
        lastName: z.string().trim().min(1).max(100),
        email: z.string().trim().email().max(254),
        phone: z.string().trim().max(100).default(""),
        comment: longText,
        quoteProduct: shortText,
        machine: shortText,
        serialNumber: shortText,
        partsNumbers: longText,
        companyName: shortText,
        shippingAddress: z.string().trim().max(1000).default(""),
    }),
});

function jsonError(message: string, status: number) {
    return NextResponse.json({ error: message }, { status });
}

export async function POST(request: NextRequest) {
    const origin = request.headers.get("origin");

    if (origin && origin !== request.nextUrl.origin) {
        return jsonError("Request origin is not allowed.", 403);
    }

    if (!request.headers.get("content-type")?.includes("application/json")) {
        return jsonError("Expected a JSON request.", 415);
    }

    let body: unknown;

    try {
        const rawBody = await request.text();

        if (new TextEncoder().encode(rawBody).byteLength > 32_768) {
            return jsonError("Your request is too large.", 413);
        }

        body = JSON.parse(rawBody);
    } catch {
        return jsonError("Invalid request.", 400);
    }

    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
        return jsonError("Please check the required fields, email address, and message length.", 400);
    }

    const { formType, values, turnstileToken } = parsed.data;
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const from = process.env.RESEND_FROM_EMAIL?.trim();
    const to =
        formType === "parts" ? process.env.RESEND_PARTS_TO_EMAIL?.trim() : process.env.RESEND_CONTACT_TO_EMAIL?.trim();

    if (!apiKey || !from || !to) {
        console.error("Website request email configuration is incomplete.");

        return jsonError("Requests are temporarily unavailable. Please call (407) 629-7968.", 503);
    }

    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY?.trim();

    const expectedHostname = process.env.TURNSTILE_EXPECTED_HOSTNAME?.trim().toLowerCase();

    const allowedHostnames = expectedHostname
        ? expectedHostname === "eckertgolf.com"
            ? ["eckertgolf.com", "www.eckertgolf.com"]
            : [expectedHostname]
        : [];

    if (!turnstileSecret || allowedHostnames.length === 0) {
        console.error("Website request verification configuration is incomplete.");

        return jsonError("Requests are temporarily unavailable. Please call (407) 629-7968.", 503);
    }

    try {
        const verified = await verifyTurnstile({
            token: turnstileToken,
            action: formType,
            secret: turnstileSecret,
            allowedHostnames,
        });

        if (!verified) {
            return jsonError("Security verification expired or failed. Please verify again.", 403);
        }
    } catch {
        console.error("Website request verification service was unavailable.");

        return jsonError("Security verification is temporarily unavailable. Please try again.", 503);
    }

    const heading =
        formType === "parts"
            ? "New parts or service request"
            : values.quoteProduct
              ? "New equipment quote request"
              : "New contact request";

    const sections = [
        heading,
        "",
        `Name: ${values.firstName} ${values.lastName}`,
        `Email: ${values.email}`,
        `Phone: ${values.phone || "Not provided"}`,
    ];

    if (formType === "parts") {
        sections.push(
            `Company: ${values.companyName || "Not provided"}`,
            `Shipping address: ${values.shippingAddress || "Not provided"}`,
            `Machine/model: ${values.machine || "Not provided"}`,
            `Serial number: ${values.serialNumber || "Not provided"}`,
            "",
            "Part numbers:",
            values.partsNumbers || "Not provided",
        );
    } else if (values.quoteProduct) {
        sections.push(`Equipment: ${values.quoteProduct}`);
    }

    sections.push("", "Comments:", values.comment || "Not provided", "", "Submitted through the Eckert Golf website.");

    try {
        const resend = new Resend(apiKey);

        const { data, error } = await resend.emails.send({
            from,
            to,
            replyTo: values.email,
            subject: `Eckert Golf — ${heading}`,
            text: sections.join("\n"),
            html: websiteRequestEmail({
                heading,
                formType,
                values,
            }),
        });

        if (error || !data?.id) {
            console.error("Resend rejected a website request.", {
                name: error?.name ?? "missing_message_id",
            });

            return jsonError("Your request could not be sent. Please try again.", 502);
        }

        return NextResponse.json({ success: true });
    } catch {
        console.error("Website request email service was unreachable.");

        return jsonError("Your request could not be sent. Please try again.", 502);
    }
}
