import "server-only";

import { AeratorProducts } from "./natural-turf/aerators";
import { DebrisBlowerProducts } from "./debris-blowers";
import { MowerProducts } from "./natural-turf/mowers";
import { ScarifierProducts } from "./natural-turf/scarifiers";
import { SyntheticTurfProducts } from "./synthetic-turf";
import { SoccerGoalProducts } from "./goals/goals";
import { LineMarkerArtificialGrassPaintProducts } from "./line-markers/paint/artificial-grass";
import { LineMarkerConcentratePaintProducts } from "./line-markers/paint/concentrate";
import { LineMarkerFieldAccessoryProducts } from "./line-markers/accessories/field-accessories";
import { LineMarkerReadyToUsePaintProducts } from "./line-markers/paint/ready-to-use";
import { LineMarkerMachineAccessoryProducts } from "./line-markers/accessories/machine-accessories";
import { LineMarkerMachineProducts } from "./line-markers/machines";
import { validateLocalCatalog } from "@/features/catalog/server/validate-local-catalog";
import { validateBrandConfiguration } from "@/features/catalog/server/validate-brand-configuration";

// Group all product collections once
const productCollections = [
    // Grounds
    ScarifierProducts,
    MowerProducts,
    SyntheticTurfProducts,
    DebrisBlowerProducts,
    AeratorProducts,
    // Goals
    SoccerGoalProducts,
    // Line Markers
    // Paints
    LineMarkerConcentratePaintProducts,
    LineMarkerReadyToUsePaintProducts,
    LineMarkerArtificialGrassPaintProducts,
    // Accessories
    LineMarkerFieldAccessoryProducts,
    LineMarkerMachineAccessoryProducts,
    // Machines
    LineMarkerMachineProducts,
];

// Includes unfinished records for future editing and migration.
const productRecords = productCollections.flat();

validateLocalCatalog(productRecords);
validateBrandConfiguration(productRecords);

export const allProducts = productRecords.filter((product) => (product.status ?? "published") === "published");
