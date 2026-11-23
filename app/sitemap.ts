import type { MetadataRoute } from "next";
import { getCatalogProducts } from "@/features/catalog/server/catalog";
import { brands } from "@/features/catalog/config/brands";
import { SITE_ORIGIN } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const pages = [
        "/",
        "/about",
        "/contact",
        "/events",
        "/finance-options",
        "/parts-form",
        "/products",
        "/privacy",
        "/accessibility",
        "/site-map",
    ];
    const catalogProducts = await getCatalogProducts();

    const products = catalogProducts.map(({ id }) => `/products/${encodeURIComponent(id)}`);
    return [...new Set([...pages, "/brands", ...brands.map(({ slug }) => `/brands/${slug}`), ...products])].map(
        (path) => ({
            url: new URL(path, SITE_ORIGIN).href,
        }),
    );
}
