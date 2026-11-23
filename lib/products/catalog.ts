import "server-only";

import type { ProductType } from "@/lib/types/product";
import { allProducts } from "@/lib/products/list/product-list";

export interface CatalogFilters {
    brand?: string;
    category?: string;
    tag?: string;
}

interface ProductCatalog {
    list(filters?: CatalogFilters): Promise<ProductType[]>;
    getById(id: string): Promise<ProductType | null>;
}

const localCatalog: ProductCatalog = {
    async list(filters = {}) {
        return allProducts.filter((product) => {
            if (filters.brand && product.brand !== filters.brand) {
                return false;
            }

            if (filters.category && product.mainCategory !== filters.category) {
                return false;
            }

            if (filters.tag && !product.tags.some((tag) => tag === filters.tag)) {
                return false;
            }

            return true;
        });
    },

    async getById(id) {
        return allProducts.find((product) => product.id === id) ?? null;
    },
};

// Local data is the current implementation.
// A future CoffeeShopCRM adapter must satisfy this same interface.
const catalog: ProductCatalog = localCatalog;

export function getCatalogProducts(filters: CatalogFilters = {}) {
    return catalog.list(filters);
}

export function getCatalogProductById(id: string) {
    return catalog.getById(id);
}
