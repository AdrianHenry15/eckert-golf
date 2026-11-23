import type { Metadata } from "next";
import PartsForm from "@/components/forms/parts-form";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
    title: "Parts & Service Support | Eckert Golf",
    description:
        "Request genuine replacement parts, maintenance, repairs, and technical service support from Eckert Golf.",
    alternates: {
        canonical: "/parts-form",
    },
    openGraph: {
        title: "Parts & Service Support | Eckert Golf",
        description:
            "Request genuine replacement parts, maintenance, repairs, and technical service support from Eckert Golf.",
        type: "website",
        url: "/parts-form",
    },
    twitter: {
        card: "summary",
        title: "Parts & Service Support | Eckert Golf",
        description:
            "Request genuine replacement parts, maintenance, repairs, and technical service support from Eckert Golf.",
    },
};

export default function PartsServicesPage() {
    return (
        <main className="w-full bg-background text-foreground">
            <PageHero
                title="Parts &"
                accent="service support"
                description="Request replacement parts or get help with equipment maintenance and repairs."
            />
            <PartsForm />
        </main>
    );
}
