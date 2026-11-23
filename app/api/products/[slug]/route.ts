import { NextResponse } from "next/server";
import { getCatalogProductById } from "@/lib/products/catalog";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function GET(_: Request, { params }: Props) {
    const { slug } = await params;

    const product = await getCatalogProductById(slug);

    if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
}
