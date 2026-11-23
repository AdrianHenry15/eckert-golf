import Product from "@/features/catalog/components/product-detail/product";
import RelatedProducts from "@/features/catalog/components/product-detail/related-products";
import DennisCassettes from "@/features/catalog/components/dennis-cassettes";
import ProductBuyingGuide from "@/features/catalog/components/product-buying-guide";
import { StaticImageData } from "next/image";
import { Metadata } from "next";
import { getCatalogProductById, getCatalogProducts } from "@/features/catalog/server/catalog";
import { notFound } from "next/navigation";
import { brands } from "@/features/catalog/config/brands";
import { SITE_ORIGIN } from "@/lib/site";
import { getRelatedProducts } from "@/features/catalog/helpers/get-related-products";
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

    const candidates = await getCatalogProducts();
    const relatedProducts = getRelatedProducts(product, candidates);

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
        <main className="w-full bg-muted text-foreground">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
                }}
            />

            <div className="mx-auto w-full max-w-7xl space-y-10 px-6 py-10 sm:py-14">
                <Product product={product} />

                {["mower-1", "mower-2"].includes(product.id) && <DennisCassettes productId={product.id} />}

                <ProductBuyingGuide product={product} />

                <RelatedProducts products={relatedProducts} />
            </div>
        </main>
    );
}
