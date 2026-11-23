import type { Metadata } from "next";
import About from "@/components/layout/about";
import AboutImage from "@/public/splash/grounds-equipment.webp";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
    title: "About EGS Equipment | Our Story & Mission",
    description:
        "Learn about EGS Equipment, our history, mission, and commitment to providing high-quality equipment solutions and customer support.",
    alternates: {
        canonical: "/about",
    },
    openGraph: {
        title: "About EGS Equipment | Our Story & Mission",
        description:
            "Learn about EGS Equipment, our history, mission, and commitment to providing high-quality equipment solutions.",
        type: "website",
        url: "/about",
    },
    twitter: {
        card: "summary",
        title: "About EGS Equipment | Our Story & Mission",
        description:
            "Learn about EGS Equipment, our history, mission, and commitment to providing high-quality equipment solutions.",
    },
};

export default function AboutPage() {
    return (
        <main className="w-full bg-background text-foreground">
            <PageHero
                title="About"
                accent="EGS Equipment"
                img={AboutImage}
                description="Learn how Eckert Golf Sales supports golf courses, sports fields, and turf professionals."
            />
            <About />
        </main>
    );
}
