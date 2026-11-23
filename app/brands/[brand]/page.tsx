import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brands, getBrandProducts } from "@/lib/products/brands";
import ProductCard from "@/app/products/components/product-card";
import { PageHero } from "@/app/components/home-splash";
import { SITE_ORIGIN } from "@/lib/site";
import { brandHeroes } from "@/lib/products/brand-heroes";
import DennisCassettes from "@/components/products/dennis-cassettes";

export const dynamicParams = false;

type Props = { params: Promise<{ brand: string }> };

export function generateStaticParams() {
    return brands.map(({ slug }) => ({ brand: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { brand: slug } = await params;
    const brand = brands.find((item) => item.slug === slug);
    if (!brand) return {};
    return {
        title: `${brand.name} Equipment`,
        description: brand.description,
        alternates: { canonical: `/brands/${brand.slug}` },
        openGraph: { title: `${brand.name} Equipment`, description: brand.description, url: `/brands/${brand.slug}` },
    };
}

export default async function BrandPage({ params }: Props) {
    const { brand: slug } = await params;
    const brand = brands.find((item) => item.slug === slug);
    if (!brand) notFound();

    const hero = brandHeroes[brand.slug];

    const { featured, range, resources } = getBrandProducts(brand);
    const breadcrumbs = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
            { "@type": "ListItem", position: 2, name: "Brands", item: `${SITE_ORIGIN}/brands` },
            { "@type": "ListItem", position: 3, name: brand.name, item: `${SITE_ORIGIN}/brands/${brand.slug}` },
        ],
    };
    return (
        <main className="w-full bg-background text-foreground">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }}
            />
            <PageHero
                img={hero?.src}
                imageAlt={hero?.alt}
                imagePosition={hero?.position}
                title={brand.name}
                accent="equipment"
                description={brand.description}
            />
            <div className="mx-auto max-w-7xl space-y-12 px-6 py-12">
                <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-sm">
                    <Link href="/">Home</Link>
                    <span aria-hidden="true">/</span>
                    <Link href="/brands">Brands</Link>
                    <span aria-hidden="true">/</span>
                    <span aria-current="page">{brand.name}</span>
                </nav>
                {[
                    { title: "Featured equipment", products: featured },
                    { title: "Explore the full range", products: range },
                ].map(
                    ({ title, products }) =>
                        products.length > 0 && (
                            <section key={title} className="space-y-6">
                                <h2 className="text-2xl font-semibold">{title}</h2>
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {products.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            </section>
                        ),
                )}
                {brand.slug === "dennis" && <DennisCassettes />}
                {resources.length > 0 && (
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">Resources</h2>
                        <ul className="space-y-3">
                            {resources.map((product) => (
                                <li key={product.id}>
                                    <Link
                                        href={`/products/${product.id}`}
                                        className="text-primary underline underline-offset-4"
                                    >
                                        {product.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
                <Link
                    href="/contact"
                    className="inline-flex rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground"
                >
                    Ask EGS about {brand.name}
                </Link>
            </div>
        </main>
    );
}
