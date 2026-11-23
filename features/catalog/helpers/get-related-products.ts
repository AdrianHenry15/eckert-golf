import type { ProductType } from "@/features/catalog/types/product";

export function getRelatedProducts(current: ProductType, candidates: ProductType[], limit = 4): ProductType[] {
    return candidates
        .filter((product) => product.id !== current.id)
        .map((product) => {
            let score = 0;

            if (product.mainCategory === current.mainCategory) {
                score += 3;
            }

            if (product.brand === current.brand) {
                score += 2;
            }

            score += product.tags.filter((tag) => current.tags.includes(tag)).length;

            return { product, score };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score || a.product.id.localeCompare(b.product.id))
        .slice(0, Math.max(0, limit))
        .map(({ product }) => product);
}
