import Cyclone8000Img from "@/public/products/debris-blowers/cyclone-8000.webp";
import CycloneKB4Img from "@/public/products/debris-blowers/cyclone-kb4.webp";
import CycloneSquaredImg from "@/public/products/debris-blowers/cyclone-squared.webp";
import CycloneMegaImg from "@/public/products/debris-blowers/cyclone-mega.webp";
import CyclonePTOImg from "@/public/products/debris-blowers/cyclone-pto.webp";

import { ProductSpecDescriptions } from "../product-spec-descriptions";
import { ProductFeatures } from "../product-features";
import { ProductSpecifications } from "../product-specifications";
import { EquipmentBrand } from "@/lib/types/brands";
import { ProductType } from "@/features/catalog/types/product";
import CycloneKB7Image from "@/public/products/debris-blowers/BT-CKB7_0000.jpg";

export const DebrisBlowerProducts: ProductType[] = [
    {
        id: "db-1",
        name: "Cyclone 8000",
        description: "Lightweight compact debris blower",
        mainCategory: "debris_blower",
        tags: ["natural_turf", "synthetic_turf"],
        brand: EquipmentBrand.BUFFALO_TURBINE,
        images: [Cyclone8000Img],
        details: {
            specs_description: ProductSpecDescriptions.cyclone_8000,
            features: ProductFeatures.cyclone_8000,
            specifications: {
                type: "standard",
                data: ProductSpecifications.cyclone_8000,
            },
            video: "",
        },
    },
    {
        id: "db-2",
        name: "Cyclone KB4",
        description: "Turbine style debris blower",
        mainCategory: "debris_blower",
        tags: ["natural_turf", "synthetic_turf"],
        brand: EquipmentBrand.BUFFALO_TURBINE,
        images: [CycloneKB4Img],
        details: {
            specs_description: ProductSpecDescriptions.cyclone_kb4,
            features: ProductFeatures.cyclone_kb4,
            specifications: {
                type: "standard",
                data: ProductSpecifications.cyclone_kb4,
            },
            video: "",
        },
    },
    {
        id: "db-3",
        name: "Cyclone Squared",
        description: "Lightweight compact debris blower",
        mainCategory: "debris_blower",
        tags: ["natural_turf", "synthetic_turf"],
        brand: EquipmentBrand.BUFFALO_TURBINE,
        images: [CycloneSquaredImg],
        details: {
            specs_description: ProductSpecDescriptions.cyclone_squared,
            features: ProductFeatures.cyclone_squared,
            specifications: {
                type: "standard",
                data: ProductSpecifications.cyclone_squared,
            },
            video: "",
        },
    },
    {
        id: "db-4",
        name: "Cyclone Mega",
        description: "Lightweight compact debris blower",
        mainCategory: "debris_blower",
        tags: ["natural_turf", "synthetic_turf"],
        brand: EquipmentBrand.BUFFALO_TURBINE,
        images: [CycloneMegaImg],
        details: {
            specs_description: ProductSpecDescriptions.cyclone_mega,
            features: ProductFeatures.cyclone_mega,
            specifications: {
                type: "standard",
                data: ProductSpecifications.cyclone_mega,
            },
            video: "",
        },
    },
    {
        id: "db-5",
        name: "Cyclone PTO",
        description: "Lightweight compact debris blower",
        mainCategory: "debris_blower",
        tags: ["natural_turf", "synthetic_turf"],
        brand: EquipmentBrand.BUFFALO_TURBINE,
        images: [CyclonePTOImg],
        details: {
            specs_description: ProductSpecDescriptions.cyclone_pto,
            features: ProductFeatures.cyclone_pto,
            specifications: {
                type: "standard",
                data: ProductSpecifications.cyclone_pto,
            },
            video: "",
        },
    },
    {
        id: "buffalo-turbine-cyclone-kb7",
        status: "published",
        name: "Buffalo Turbine Cyclone KB7 Debris Blower",
        description:
            "Tow-behind turbine debris blower with wireless engine and nozzle controls for grounds maintenance.",
        mainCategory: "debris_blower",
        tags: ["natural_turf", "synthetic_turf"],
        brand: EquipmentBrand.BUFFALO_TURBINE,
        images: [CycloneKB7Image],
        manufacturerUrl: "https://buffaloturbine.com/product/cyclone-kb7",
        productSheet: "https://buffaloturbine.com/wp-content/uploads/BT-CKB7.pdf",
        details: {
            specs_description:
                "The Cyclone KB7 combines a gasoline engine with remotely controlled airflow direction for clearing grounds debris. Ask EGS to confirm towing compatibility, nozzle options, and the configuration appropriate for your site.",
            features: [
                "Wireless remote engine start, stop, and throttle control.",
                "Ten-button handheld remote.",
                "360-degree nozzle rotation with automatic positioning.",
                "Adjustable hitch height and length.",
                "Polymer discharge nozzle.",
            ],
            specifications: {
                type: "standard",
                data: {
                    model: "Cyclone KB7",
                    code: "BT-CKB7",
                    action: "Turbine debris blowing",
                    power_source_output: "26.5 HP EFI gasoline engine",
                    dimensions: {
                        length: "96 inches with nozzle",
                        width: "47.5 inches with wheels",
                        height: "36 inches",
                    },
                },
            },
        },
    },
];
