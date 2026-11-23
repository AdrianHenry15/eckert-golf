import type { ProductType } from "@/features/catalog/types/product";
import ProductCard from "@/features/catalog/components/product-card";

interface RelatedProductsProps {
    products: ProductType[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
    if (products.length === 0) return null;

    return (
        <section aria-labelledby="related-products-heading" className="w-full border-t border-border pt-10">
            <div className="w-full">
                <h2 id="related-products-heading" className="mb-6 text-2xl font-semibold text-foreground">
                    Related Products
                </h2>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
