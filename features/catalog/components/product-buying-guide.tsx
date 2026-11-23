import Link from "next/link";

import type { ProductType } from "@/features/catalog/types/product";
import { brands } from "@/features/catalog/config/brands";

const buyingQuestions: Record<string, string[]> = {
    sisis: [
        "Which maintenance task and surface conditions should we consider?",
        "Which working width and configuration suit your site?",
        "Which parts and operating guidance do you need?",
    ],
    dennis: [
        "Which mower and cutting width suit your surface?",
        "What finish and maintenance tasks are you aiming for?",
        "What servicing, storage, and operating requirements should we consider?",
    ],
    pitchmark: [
        "Which machine and paint combination suits your surface?",
        "Which accessories and replacement components do you need?",
        "How frequently will you mark your pitches?",
    ],
    buffalo_turbine: [
        "Which configuration suits your site and towing equipment?",
        "What access restrictions and terrain should we consider?",
        "Which current model and accessories meet your requirements?",
    ],
    synpro: [
        "Which equipment suits your synthetic surface and infill?",
        "What maintenance does your surface manufacturer recommend?",
        "Which brushes or attachments suit the work?",
    ],
    harrod_sport: [
        "Which goal size and configuration suit your facility?",
        "What anchoring and storage arrangements are required?",
        "Which nets, wheels, and accessories do you need?",
    ],
};

function getBuyingQuestions(product: ProductType): string[] {
    const tags: readonly string[] = product.tags;

    // These existing listings represent cassette-system mowers.
    if (product.brand === "dennis" && ["mower-1", "mower-2"].includes(product.id)) {
        return [
            "Which cutting width and cylinder configuration suit your surface?",
            "Which maintenance cassettes are available for your exact mower model?",
            "What model, serial number, and cassette width should EGS check?",
        ];
    }

    if (tags.includes("aerator")) {
        return [
            "Which aeration method and tine options suit your maintenance goals?",
            "What soil conditions, working depth, and timing should we discuss?",
            "What access, operating, and replacement tine requirements do you have?",
        ];
    }

    if (tags.includes("rotary_mower")) {
        return [
            "What cutting height, finish, and collection requirements do you have?",
            "Which power source suits your site, storage, and operating routine?",
            "What mowing area, access restrictions, and surface conditions should we consider?",
        ];
    }

    if (tags.includes("reel_mower")) {
        return [
            "Which cutting width and height of cut suit your turf?",
            "Which cylinder configuration is appropriate for your desired finish?",
            "What sharpening, servicing, and operator guidance will you need?",
        ];
    }

    return (
        buyingQuestions[product.brand] ?? [
            "Which configuration suits your application?",
            "Which accessories and replacement parts do you need?",
            "What site requirements should we consider?",
        ]
    );
}

interface ProductBuyingGuideProps {
    product: ProductType;
}

export default function ProductBuyingGuide({ product }: ProductBuyingGuideProps) {
    const brand = brands.find((item) => item.key === product.brand);

    const questions = getBuyingQuestions(product);

    return (
        <section
            aria-labelledby="product-buying-heading"
            className="rounded-2xl border border-border bg-card p-6 text-card-foreground sm:p-8"
        >
            <h2 id="product-buying-heading" className="text-2xl font-semibold tracking-tight">
                Choosing the right equipment
            </h2>

            <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
                Considering the {product.name}? Tell EGS about your surface, maintenance goals, and existing equipment
                so we can discuss the right configuration.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                    <h3 className="text-lg font-semibold">Questions to discuss</h3>

                    <ul className="mt-3 list-disc space-y-3 pl-5 text-sm leading-6 text-muted-foreground">
                        {questions.map((question) => (
                            <li key={question}>{question}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold">Before placing an order</h3>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        Ask about current availability, included equipment, optional extras, parts support, operating
                        guidance, and delivery arrangements. Confirm model-specific compatibility before ordering
                        accessories or replacement parts.
                    </p>
                </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
                <Link
                    href={{
                        pathname: "/contact",
                        query: { product: product.id },
                    }}
                    className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                    Discuss this equipment
                </Link>

                {brand && (
                    <Link
                        href={`/brands/${brand.slug}`}
                        className="text-sm font-semibold text-primary underline underline-offset-4"
                    >
                        Explore more {brand.name} equipment
                    </Link>
                )}
            </div>
        </section>
    );
}
