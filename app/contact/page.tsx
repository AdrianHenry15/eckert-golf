import type { Metadata } from "next";
import ContactForm from "@/components/forms/contact-form";
import { PageHero } from "@/components/layout/page-hero";
import { getCatalogProductById } from "@/features/catalog/server/catalog";

export const metadata: Metadata = {
    title: "Contact Eckert Golf | Sales, Support & Quotes",
    description:
        "Contact Eckert Golf for product questions, equipment quotes, sales support, parts assistance, and general inquiries.",
    alternates: {
        canonical: "/contact",
    },
    openGraph: {
        title: "Contact Eckert Golf | Sales, Support & Quotes",
        description:
            "Get in touch with Eckert Golf for product questions, equipment quotes, sales support, and general inquiries.",
        type: "website",
        url: "/contact",
    },
    twitter: {
        card: "summary",
        title: "Contact Eckert Golf | Sales, Support & Quotes",
        description:
            "Get in touch with Eckert Golf for product questions, equipment quotes, sales support, and general inquiries.",
    },
};

export default async function ContactPage({
    searchParams,
}: {
    searchParams: Promise<{ product?: string | string[] }>;
}) {
    const { product: productId } = await searchParams;

    const selectedProduct = typeof productId === "string" ? await getCatalogProductById(productId) : null;

    const quoteProduct = selectedProduct?.name;
    return (
        <main className="w-full bg-background text-foreground">
            <PageHero
                title="Contact"
                accent="Eckert Golf"
                description="Talk with our team about equipment quotes, product questions, and sales support."
            />
            <ContactForm key={quoteProduct ?? "contact"} quoteProduct={quoteProduct} />
        </main>
    );
}
