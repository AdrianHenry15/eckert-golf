import GSeriesImg from "@/public/products/natural/g660-g760-g860-dennis.webp";
import ES860Img from "@/public/products/natural/es-860-dennis.webp";
import HoverMowerImg from "@/public/products/natural/hover-mower.webp";
import ES34RImage from "@/public/products/natural/dennis/dennis-es-34.png";
import Pro34RImage from "@/public/products/natural/dennis/dennis-pro34r.png";
import { ProductSpecDescriptions } from "../../product-spec-descriptions";
import { ProductFeatures } from "../../product-features";
import { ProductSpecifications } from "../../product-specifications";
import { ProductType } from "@/features/catalog/types/product";
import { EquipmentBrand } from "@/lib/types/brands";

export const MowerProducts: ProductType[] = [
    {
        id: "mower-1",
        name: "G660, G760, G860",
        description: "Interchangeable Cassette System Mowers",
        mainCategory: "natural_turf",
        tags: ["reel_mower", "rotary_mower", "natural_turf"],
        images: [GSeriesImg],
        brand: EquipmentBrand.DENNIS,
        manual: "https://dennis-api.wsio-api.com/uploads/manuals_G_SERIES_CASSETTE_MOWER_d704cb9b31.pdf",
        details: {
            specs_description: ProductSpecDescriptions.gseries,
            features: ProductFeatures.gseries,
            specifications: {
                type: "standard",
                data: ProductSpecifications.gseries,
            },
            video: "",
        },
    },
    {
        id: "mower-2",
        name: "Dennis ES860 Battery-Powered Reel Mower",
        description: "Battery powered mower and Maintenance system",
        mainCategory: "natural_turf",
        tags: ["reel_mower", "rotary_mower", "natural_turf"],
        images: [ES860Img],
        brand: EquipmentBrand.DENNIS,
        manual: "https://dennis-api.wsio-api.com/uploads/manuals_ES_860_ES_760_5a49c756a8.pdf",
        details: {
            specs_description: ProductSpecDescriptions.es860,
            features: ProductFeatures.es860,
            specifications: {
                type: "standard",
                data: ProductSpecifications.es860,
            },
            video: "",
        },
    },
    {
        id: "mower-3",
        name: "Hover Mower",
        description: "Hover light mower",
        mainCategory: "natural_turf",
        tags: ["natural_turf"],
        images: [HoverMowerImg],
        brand: EquipmentBrand.EASTMAN,
        manual: "https://thehovermower.com/pdf/HM16H-4-manual.pdf",
        details: {
            specs_description: ProductSpecDescriptions.hover_mower,
            features: [],
            specifications: {
                type: "standard",
                data: ProductSpecifications.hover_mower,
            },
            video: "",
        },
    },
    {
        id: "dennis-es34r",
        status: "published",
        name: "Dennis ES34R Battery-Powered Rotary Mower",
        description:
            "Battery-powered rotary mower for fine turf cutting and sports pitch clean-up, with an 860 mm cutting width.",
        mainCategory: "natural_turf",
        tags: ["rotary_mower", "natural_turf"],
        brand: EquipmentBrand.DENNIS,
        images: [ES34RImage],
        manufacturerUrl: "https://dennisuk.com/es-34r",
        manual: "https://dennis-api.wsio-api.com/uploads/SP_20058_EN_REV_6_1_ES_34_R_Operator_Manual_English_448c84b81d.pdf",
        details: {
            specs_description:
                "The Dennis ES34R uses battery power and counter-rotating twin blades for cutting and collecting surface debris. It is suited to sports pitches, lawns, and routine presentation work. Ask EGS about charging arrangements and the configuration for your facility.",
            features: [
                "Counter-rotating twin blades.",
                "Adjustable cutting height from 15–50 mm.",
                "Two-section aluminium rear roller.",
                "Adjustable handlebars.",
                "Display with battery and operating information.",
            ],
            specifications: {
                type: "standard",
                data: {
                    model: "ES34R",
                    code: "D152",
                    action: "Rotary mowing and turf clean-up",
                    operating_width: "860 mm / 34 inches",
                    power_source_output: "48 V battery system",
                },
            },
        },
    },
    {
        id: "dennis-pro34r",
        status: "published",
        name: "Dennis Pro34R Petrol Rotary Mower",
        description:
            "Petrol-powered rotary mower for sports pitches and lawns, with an 860 mm cutting width and debris collection.",
        mainCategory: "natural_turf",
        tags: ["rotary_mower", "natural_turf"],
        brand: EquipmentBrand.DENNIS,
        images: [Pro34RImage],
        manufacturerUrl: "https://dennisuk.com/pro-34r",
        manual: "https://dennis-api.wsio-api.com/uploads/SP_20048_REV_2_1_Pro34_R_Operator_Manual_34ce97a8bb.pdf",
        details: {
            specs_description:
                "The Dennis Pro34R combines petrol power with rotary cutting and vacuum collection for sports turf maintenance. Its rear roller produces a striped finish. Ask EGS to confirm current US availability, configuration, and delivery arrangements.",
            features: [
                "Honda GX200 petrol engine.",
                "Adjustable cutting height from 15–50 mm.",
                "Two-section cast aluminium rear roller.",
                "Single-point cutting height adjustment.",
                "Adjustable handlebars.",
            ],
            specifications: {
                type: "standard",
                data: {
                    model: "Pro34R",
                    code: "D095",
                    action: "Rotary mowing and turf clean-up",
                    operating_width: "860 mm / 34 inches",
                    power_source_output: "Honda GX200 petrol engine",
                },
            },
        },
    },
];
