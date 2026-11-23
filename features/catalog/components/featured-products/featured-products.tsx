import Link from "next/link";
import { brands } from "@/features/catalog/config/brands";
import { getBrandProducts } from "@/features/catalog/server/brand-products";
import ProductCard from "../product-card";

export default async function FeaturedProducts() {
    const sections = await Promise.all(
        brands.map(async (brand) => ({
            brand,
            ...(await getBrandProducts(brand)),
        })),
    );

    return (
        <section className="w-full bg-muted px-6 py-16 text-foreground">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
                    <h2 className="text-3xl font-semibold tracking-tight">Featured equipment</h2>
                    <Link href="/brands" className="font-semibold text-primary underline underline-offset-4">
                        Browse all brands
                    </Link>
                </div>
                {sections.map(({ brand, featured }) => (
                    <section key={brand.slug} className="mb-12 last:mb-0">
                        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
                            <h3 className="text-2xl font-semibold">{brand.name}</h3>
                            <Link href={`/brands/${brand.slug}`} className="text-primary underline underline-offset-4">
                                View full {brand.name} range
                            </Link>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {featured.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    imageSizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 310px"
                                />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </section>
    );
}
