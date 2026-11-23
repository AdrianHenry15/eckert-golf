import { PageHero } from "@/components/layout/page-hero";

export default function HomeSplash() {
    return (
        <PageHero
            title="Professional"
            accent="turf equipment"
            description="Mowers, turf maintenance machines, and line marking equipment for golf courses and sports fields."
            action={{
                href: "/products",
                label: "Shop equipment",
            }}
        />
    );
}
