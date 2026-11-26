interface WebsiteRequestEmailOptions {
    heading: string;
    formType: "contact" | "parts";
    values: Record<string, string>;
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export function websiteRequestEmail({ heading, formType, values }: WebsiteRequestEmailOptions): string {
    const fields: Array<[string, string]> = [
        ["Name", `${values.firstName ?? ""} ${values.lastName ?? ""}`.trim()],
        ["Email", values.email ?? ""],
        ["Phone", values.phone ?? ""],
    ];

    if (formType === "parts") {
        fields.push(
            ["Company", values.companyName ?? ""],
            ["Shipping address", values.shippingAddress ?? ""],
            ["Machine / model", values.machine ?? ""],
            ["Serial number", values.serialNumber ?? ""],
            ["Part numbers", values.partsNumbers ?? ""],
        );
    } else if (values.quoteProduct) {
        fields.push(["Equipment", values.quoteProduct]);
    }

    fields.push(["Comments", values.comment ?? ""]);

    const rows = fields
        .map(
            ([label, value]) => `
                <tr>
                    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;">
                        <div style="margin-bottom:5px;font-size:12px;font-weight:700;color:#526459;">
                            ${escapeHtml(label)}
                        </div>
                        <div style="font-size:15px;line-height:24px;color:#172b20;overflow-wrap:anywhere;">
                            ${escapeHtml(value || "Not provided").replace(/\r?\n/g, "<br>")}
                        </div>
                    </td>
                </tr>
            `,
        )
        .join("");

    return `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(heading)}</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f0;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:32px 12px;">
                <table
                    role="presentation"
                    width="600"
                    cellpadding="0"
                    cellspacing="0"
                    style="width:100%;max-width:600px;background:#ffffff;border:1px solid #dfe4dd;"
                >
                    <tr>
                        <td style="padding:28px;background:#163d2a;border-bottom:4px solid #d8b139;">
                            <p style="margin:0;font-size:26px;font-weight:700;color:#ffffff;">
                                Eckert Golf
                            </p>
                            <p style="margin:8px 0 0;font-size:13px;line-height:20px;color:#e1e9e3;">
                                Professional turf &amp; sports field equipment
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:28px;">
                            <h1 style="margin:0 0 12px;font-size:23px;line-height:30px;color:#163d2a;">
                                ${escapeHtml(heading)}
                            </h1>
                            <p style="margin:0 0 20px;font-size:14px;line-height:23px;color:#526459;">
                                A visitor submitted the following request through eckertgolf.com.
                            </p>

                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                ${rows}
                            </table>

                            <p style="margin:24px 0 0;padding:16px;background:#f3f5f0;font-size:14px;line-height:23px;color:#163d2a;">
                                <strong>Ready to follow up?</strong><br>
                                Reply directly to this email to contact the customer.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:22px 28px;background:#f8f9f6;border-top:1px solid #e5e7eb;font-size:12px;line-height:20px;color:#526459;">
                            <strong>Eckert Golf Sales, Inc.</strong><br>
                            5415 Lake Howell Road #190<br>
                            Winter Park, FL 32792<br>
                            <a href="https://www.eckertgolf.com" style="color:#163d2a;">
                                www.eckertgolf.com
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}
