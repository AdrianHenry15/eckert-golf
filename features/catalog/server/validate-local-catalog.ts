import "server-only";

import type { ProductType } from "@/features/catalog/types/product";

export function validateLocalCatalog(products: ProductType[]): void {
    const problems: string[] = [];
    const ids = new Set<string>();

    for (const product of products) {
        const id = product.id.trim();
        const label = id || "(missing ID)";

        if (!id) {
            problems.push("A product is missing its ID.");
        } else {
            if (id !== product.id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
                problems.push(`${label}: use a lowercase, hyphenated ID.`);
            }

            if (ids.has(id)) {
                problems.push(`${label}: duplicate product ID.`);
            }

            ids.add(id);
        }

        const status = product.status ?? "published";

        if (status !== "published") {
            continue;
        }

        if (!product.name.trim()) {
            problems.push(`${label}: published product needs a name.`);
        }

        if (!product.description.trim()) {
            problems.push(`${label}: published product needs a description.`);
        }

        if (!product.brand) {
            problems.push(`${label}: published product needs a brand.`);
        }

        if (!product.mainCategory) {
            problems.push(`${label}: published product needs a category.`);
        }

        if (product.images.length === 0) {
            problems.push(`${label}: published product needs an image.`);
        }

        for (const image of product.images) {
            const src = typeof image === "string" ? image : image.src;

            if (!src.trim()) {
                problems.push(`${label}: an image has an empty source.`);
            }
        }

        for (const [field, value] of [
            ["manual", product.manual],
            ["productSheet", product.productSheet],
        ] as const) {
            if (value === undefined) continue;

            if (!isDocumentUrl(value)) {
                problems.push(`${label}: ${field} must be a local path or HTTPS URL.`);
            }
        }
    }

    if (problems.length > 0) {
        throw new Error(
            ["Local product catalog validation failed:", ...problems.map((problem) => `- ${problem}`)].join("\n"),
        );
    }
}

function isDocumentUrl(value: string): boolean {
    if (!value || value !== value.trim()) return false;

    if (value.startsWith("/") && !value.startsWith("//")) {
        return true;
    }

    try {
        return new URL(value).protocol === "https:";
    } catch {
        return false;
    }
}
