import { NextResponse } from "next/server";
import { getCatalogProducts, type CatalogFilters } from "@/lib/products/catalog";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const filters: CatalogFilters = {};

    for (const key of ["brand", "category", "tag"] as const) {
        const value = searchParams.get(key)?.trim();

        if (value) {
            filters[key] = value;
        }
    }

    const products = await getCatalogProducts(filters);

    return NextResponse.json(products);
}
