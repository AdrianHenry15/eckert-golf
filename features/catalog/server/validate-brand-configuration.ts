import "server-only";

import { brands } from "@/features/catalog/config/brands";
import type { ProductType } from "@/features/catalog/types/product";

export function validateBrandConfiguration(products: readonly ProductType[]): void {
    const productsById = new Map(products.map((product) => [product.id, product]));

    const errors: string[] = [];

    for (const brand of brands) {
        const resourceIds: readonly string[] = "resources" in brand ? (brand.resources ?? []) : [];

        const groups = [
            { name: "featured", ids: brand.featured },
            { name: "resources", ids: resourceIds },
        ];

        const assignedIds = new Set<string>();

        for (const group of groups) {
            for (const id of group.ids) {
                const label = `${brand.name} / ${group.name} / ${id}`;

                if (assignedIds.has(id)) {
                    errors.push(`${label}: product is listed more than once.`);
                }

                assignedIds.add(id);

                const product = productsById.get(id);

                if (!product) {
                    errors.push(`${label}: product ID does not exist.`);
                    continue;
                }

                if (product.brand !== brand.key) {
                    errors.push(`${label}: product belongs to "${product.brand}".`);
                }

                if (product.status === "archived") {
                    errors.push(`${label}: remove this archived product from the brand configuration.`);
                }
            }
        }
    }

    if (errors.length > 0) {
        throw new Error(`Invalid brand configuration:\n${errors.map((error) => `- ${error}`).join("\n")}`);
    }
}
