import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

import { brands } from "@/lib/products/brands";
import { brandHeroes } from "@/lib/products/brand-heroes";
import { PageHero } from "@/app/components/home-splash";
import DefaultHero from "@/public/splash/turf-equipment-hero.webp";

export const metadata: Metadata = {
    title: "Equipment Brands",
    description: "Browse SISIS, Dennis, Pitchmark, Buffalo Turbine, Syn-Pro, and Harrod Sport equipment from EGS.",
    alternates: {
        canonical: "/brands",
    },
};

export default function BrandsPage() {
    return (
        <main className="w-full bg-background text-foreground">
            <PageHero
                title="Equipment"
                accent="brands"
                description="Explore our equipment brands and find the right tools for your grounds."
            />

            <section aria-label="Equipment brands" className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
                <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {brands.map((brand) => {
                        const hero = brandHeroes[brand.slug];

                        return (
                            <li key={brand.slug} className="h-full">
                                <Link
                                    href={`/brands/${brand.slug}`}
                                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                                >
                                    <div className="relative aspect-16/10 overflow-hidden bg-muted">
                                        <Image
                                            src={hero?.src ?? DefaultHero}
                                            alt={hero?.alt ?? `${brand.name} equipment`}
                                            fill
                                            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105 motion-reduce:transition-none"
                                            style={{
                                                objectPosition: hero?.position ?? "center",
                                            }}
                                        />
                                    </div>

                                    <div className="flex flex-1 flex-col p-6">
                                        <h2 className="text-2xl font-semibold tracking-tight">{brand.name}</h2>

                                        <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                                            {brand.description}
                                        </p>

                                        <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm font-semibold text-primary">
                                            <span>Explore equipment</span>

                                            <ArrowUpRightIcon aria-hidden="true" className="size-5" />
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </main>
    );
}
