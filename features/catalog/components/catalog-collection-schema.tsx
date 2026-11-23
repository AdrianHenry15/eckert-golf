import type { ProductType } from "@/features/catalog/types/product";
import { SITE_ORIGIN } from "@/lib/site";

interface CatalogCollectionSchemaProps {
    name: string;
    description: string;
    pathname: string;
    products: readonly ProductType[];
}

export default function CatalogCollectionSchema({
    name,
    description,
    pathname,
    products,
}: CatalogCollectionSchemaProps) {
    const pageUrl = new URL(pathname, SITE_ORIGIN).href;

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${pageUrl}#collection`,
        url: pageUrl,
        name,
        description,
        mainEntity: {
            "@type": "ItemList",
            "@id": `${pageUrl}#products`,
            numberOfItems: products.length,
            itemListElement: products.map((product, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: product.name,
                item: new URL(`/products/${encodeURIComponent(product.id)}`, SITE_ORIGIN).href,
            })),
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
            }}
        />
    );
}
