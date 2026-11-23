import HomeSplash from "@/features/home/components/home-splash";
import EquipmentDirectory from "@/features/home/components/equipment-directory";
import BrandStrip from "@/features/catalog/components/brand-strip";
import FeaturedProducts from "@/features/catalog/components/featured-products/featured-products";
import FeaturedEvents from "@/features/events/components/featured-events";
import { Metadata } from "next";
export const metadata: Metadata = {
    alternates: { canonical: "/" },
};

export default function Home() {
    return (
        <main className="relative flex min-h-screen w-full flex-col bg-background text-foreground">
            <HomeSplash />
            <EquipmentDirectory />

            <section className="border-t border-border">
                <BrandStrip />
            </section>

            <section className="border-t border-border">
                <FeaturedProducts />
            </section>

            <section className="border-t border-border">
                <FeaturedEvents />
            </section>
        </main>
    );
}
