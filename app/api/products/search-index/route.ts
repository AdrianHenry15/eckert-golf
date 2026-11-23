import { NextResponse } from "next/server";

import { getCatalogProducts } from "@/features/catalog/server/catalog";
import { SearchProduct } from "@/features/catalog/components/types/search-product";

export async function GET() {
    const products = await getCatalogProducts();

    const searchIndex: SearchProduct[] = products.map((product) => {
        const image = product.images[0];

        return {
            id: product.id,
            name: product.name,
            brand: product.brand,
            mainCategory: product.mainCategory,
            image: image ? (typeof image === "string" ? image : image.src) : null,
        };
    });

    return NextResponse.json(searchIndex);
}
