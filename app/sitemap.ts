import type { MetadataRoute } from "next";
import { allProducts } from "@/lib/products/list/product-list";
import { brands } from "@/lib/products/brands";
import { SITE_ORIGIN } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
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
    const products = allProducts.map(({ id }) => `/products/${encodeURIComponent(id)}`);

    return [...new Set([...pages, "/brands", ...brands.map(({ slug }) => `/brands/${slug}`), ...products])].map(
        (path) => ({
            url: new URL(path, SITE_ORIGIN).href,
        }),
    );
}
