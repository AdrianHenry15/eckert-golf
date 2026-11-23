import "server-only";

import { brands } from "@/features/catalog/config/brands";
import { getCatalogProducts } from "@/features/catalog/server/catalog";

type CatalogBrand = (typeof brands)[number];

export async function getBrandProducts(brand: CatalogBrand) {
    const products = await getCatalogProducts({
        brand: brand.key,
    });

    const resourceIds = "resources" in brand ? (brand.resources ?? []) : [];

    const productsById = new Map(products.map((product) => [product.id, product]));

    const featured = brand.featured.flatMap((id) => {
        const product = productsById.get(id);

        return product ? [product] : [];
    });

    return {
        featured,
        range: products.filter((product) => !brand.featured.includes(product.id) && !resourceIds.includes(product.id)),
        resources: products.filter((product) => resourceIds.includes(product.id)),
    };
}
