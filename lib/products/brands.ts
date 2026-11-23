import { allProducts } from "@/lib/products/list/product-list";

export const brands = [
    {
        slug: "sisis",
        key: "sisis",
        name: "SISIS",
        description:
            "Explore SISIS scarifiers, verticutters, and aerators for natural turf maintenance. Compare the Rotorake 600HDX, Veemo MK2, and Auto Rotorake MK5, then ask EGS about reel options and your application.",
        featured: ["sisis-rotorake-600hdx", "gst-5", "gst-4"],
    },
    {
        slug: "dennis",
        key: "dennis",
        name: "Dennis",
        description:
            "Explore Dennis reel mowers and turf maintenance systems. Start with the ES860 or browse the G-series cassette mower listing. Ask EGS to confirm cassette compatibility for your specific mower before ordering.",
        featured: ["mower-2", "mower-1"],
    },
    {
        slug: "pitchmark",
        key: "pitchmark",
        name: "Pitchmark",
        description:
            "Browse Pitchmark line marking machines, paints, and service accessories for sports fields. Start with the Hybrid, then explore the wider machine range and marking resources.",
        featured: ["lmm-1", "lmpc-1", "lmma-3"],
        resources: ["lmfa-1"],
    },
    {
        slug: "buffalo-turbine",
        key: "buffalo_turbine",
        name: "Buffalo Turbine",
        description:
            "Browse the Buffalo Turbine debris blowers currently listed by EGS. Compare the Cyclone 8000, Mega, and Squared listings, and contact EGS to confirm current model availability and equipment compatibility.",
        featured: ["db-1", "db-4", "db-3"],
    },
    {
        slug: "syn-pro",
        key: "synpro",
        name: "Syn-Pro by SISIS",
        description:
            "Explore synthetic turf maintenance equipment, starting with Brush Pro and OSCA 3. Browse the wider range of brushes, sweepers, and deep cleaners for your surface and maintenance requirements.",
        featured: ["syn-1", "syn-4"],
    },
    {
        slug: "harrod-sport",
        key: "harrod_sport",
        name: "Harrod Sport",
        description:
            "Explore Harrod Sport goals and training equipment. Start with the 4G Swivel Portagoal and browse the wider range. Ask EGS about sizes, anchoring, and accessories for your facility.",
        featured: ["sgp-4"],
    },
];

export function getBrandProducts(brand: (typeof brands)[number]) {
    const products = allProducts.filter((product) => product.brand === brand.key);
    const featured = brand.featured.flatMap((id) => products.filter((product) => product.id === id));
    const resourceIds = "resources" in brand ? (brand.resources ?? []) : [];
    return {
        featured,
        range: products.filter((product) => !brand.featured.includes(product.id) && !resourceIds.includes(product.id)),
        resources: products.filter((product) => resourceIds.includes(product.id)),
    };
}
