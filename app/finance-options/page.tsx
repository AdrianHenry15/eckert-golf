import type { Metadata } from "next";
import FinanceOptions from "@/components/layout/finance-options";
import CanonFinanceImage from "@/public/logos/canon-logo.png";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
    title: "Financing Options | Eckert Golf",
    description:
        "Explore equipment financing options from Eckert Golf, including flexible payment solutions for commercial turf, grounds, and maintenance equipment.",
    alternates: {
        canonical: "/finance-options",
    },
    openGraph: {
        title: "Financing Options | Eckert Golf",
        description:
            "Explore flexible equipment financing options for commercial turf, grounds, and maintenance equipment.",
        type: "website",
        url: "/finance-options",
    },
    twitter: {
        card: "summary",
        title: "Financing Options | Eckert Golf",
        description:
            "Explore flexible equipment financing options for commercial turf, grounds, and maintenance equipment.",
    },
};

export default function FinanceOptionsPage() {
    return (
        <main className="w-full bg-background text-foreground">
            <PageHero
                title="Equipment"
                accent="financing"
                description="Explore commercial equipment financing and leasing through Canon Financial Services."
                img={CanonFinanceImage}
            />
            <FinanceOptions />
        </main>
    );
}
