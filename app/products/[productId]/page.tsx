import type { Metadata } from "next";
import Product from "@/app/products/[productId]/components/product";
import RelatedProducts from "./components/related-products";
import { notFound } from "next/navigation";
import { brands } from "@/lib/products/brands";
import { SITE_ORIGIN } from "@/lib/site";
import { StaticImageData } from "next/image";
import DennisCassettes from "@/components/products/dennis-cassettes";
import Link from "next/link";
import ProductBuyingGuide from "@/components/products/product-buying-guide";
import { getCatalogProductById } from "@/lib/products/catalog";

interface ProductPageProps {
    params: Promise<{
        productId: string;
    }>;
}

const getMetadataImageUrl = (image?: string | StaticImageData): string | undefined => {
    if (!image) return undefined;

    return typeof image === "string" ? image : image.src;
};

export async function generateMetadata(props: ProductPageProps): Promise<Metadata> {
    const { productId } = await props.params;

    const product = await getCatalogProductById(productId);

    if (!product) {
        return {
            title: "Product Not Found",
            description: "The requested product could not be found.",
        };
    }

    const title = product.name;
    const description =
        product.description?.slice(0, 160) ?? `Learn more about ${product.name} from EGS Equipment Solutions.`;

    const image = getMetadataImageUrl(product.images?.[0]);

    return {
        title,
        description,

        keywords: [
            product.name,
            product.brand,
            product.mainCategory,
            ...(product.tags ?? []),
            "EGS Equipment",
            "Industrial Equipment",
        ],

        openGraph: {
            title,
            description,
            type: "website",
            url: `/products/${product.id}`,
            images: image
                ? [
                      {
                          url: image,
                          width: 1200,
                          height: 630,
                          alt: product.name,
                      },
                  ]
                : [],
        },

        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: image ? [image] : [],
        },

        alternates: {
            canonical: `/products/${product.id}`,
        },
    };
}
export default async function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
    const { productId } = await params;

    const product = await getCatalogProductById(productId);
    if (!product) notFound();

    const brand = brands.find((item) => item.key === product.brand);
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        url: `${SITE_ORIGIN}/products/${product.id}`,
        brand: { "@type": "Brand", name: brand?.name ?? product.brand },
        image: product.images.map((image) => new URL(typeof image === "string" ? image : image.src, SITE_ORIGIN).href),
    };
    return (
        <div className="flex relative flex-col items-center w-full">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
            />
            <Product productId={productId} />
            {["mower-1", "mower-2"].includes(productId) && (
                <div className="mx-auto w-full max-w-7xl px-6 py-12">
                    <DennisCassettes productId={productId} />

                    <Link
                        href="/brands/dennis#dennis-cassettes"
                        className="mt-5 inline-block text-sm font-semibold text-primary underline underline-offset-4"
                    >
                        Explore Dennis equipment and cassette options
                    </Link>
                </div>
            )}
            <div className="mx-auto w-full max-w-7xl px-6 pb-12">
                <ProductBuyingGuide product={product} />
            </div>
            <RelatedProducts productId={productId} />
        </div>
    );
}
