"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import Fuse from "fuse.js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";

import { useModalStore } from "@/stores/modal-store/modal-store";
import { SearchProduct } from "@/features/catalog/components/types/search-product";

type LoadState = "loading" | "ready" | "error";

export default function SearchModal({ placeholder = "Search products..." }: { placeholder?: string }) {
    const router = useRouter();
    const { closeModal } = useModalStore();

    const inputRef = useRef<HTMLInputElement>(null);
    const resultsId = useId();

    const [products, setProducts] = useState<SearchProduct[]>([]);
    const [loadState, setLoadState] = useState<LoadState>("loading");
    const [retryCount, setRetryCount] = useState(0);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [naturalTurfOnly, setNaturalTurfOnly] = useState(false);
    const [sisisOnly, setSisisOnly] = useState(false);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        async function loadProducts() {
            try {
                const response = await fetch("/api/products/search-index", {
                    signal: controller.signal,
                    cache: "no-store",
                });

                if (!response.ok) {
                    throw new Error("Search index request failed");
                }

                const data: SearchProduct[] = await response.json();

                if (!controller.signal.aborted) {
                    setProducts(data);
                    setLoadState("ready");
                }
            } catch {
                if (!controller.signal.aborted) {
                    setLoadState("error");
                }
            }
        }

        void loadProducts();

        return () => controller.abort();
    }, [retryCount]);

    const fuse = useMemo(() => {
        const candidates = products.filter((product) => {
            if (naturalTurfOnly && product.mainCategory !== "natural_turf") {
                return false;
            }

            if (sisisOnly && product.brand !== "sisis") {
                return false;
            }

            return true;
        });

        return new Fuse(candidates, {
            keys: ["name"],
            threshold: 0.3,
            ignoreLocation: true,
        });
    }, [products, naturalTurfOnly, sisisOnly]);

    const results = useMemo(() => {
        const search = query.trim();

        if (search.length < 2) return [];

        return fuse.search(search, { limit: 12 }).map(({ item }) => item);
    }, [query, fuse]);

    const selectedProduct = results[selectedIndex];

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Escape") {
            event.preventDefault();
            closeModal();
            return;
        }

        if (results.length === 0) return;

        if (event.key === "ArrowDown") {
            event.preventDefault();
            setSelectedIndex((index) => Math.min(index + 1, results.length - 1));
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            setSelectedIndex((index) => Math.max(index - 1, 0));
        }

        if (event.key === "Enter" && selectedProduct) {
            event.preventDefault();
            closeModal();
            router.push(`/products/${selectedProduct.id}`);
        }
    };

    const filterClass = (active: boolean) =>
        `rounded-full border px-3 py-1.5 text-sm font-medium transition ${
            active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-muted text-muted-foreground hover:bg-accent"
        }`;

    return (
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-2xl sm:max-w-lg md:max-w-xl">
            <div className="relative">
                <AiOutlineSearch
                    aria-hidden="true"
                    className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground"
                />

                <input
                    ref={inputRef}
                    type="text"
                    role="combobox"
                    aria-label="Search equipment"
                    aria-autocomplete="list"
                    aria-controls={resultsId}
                    aria-expanded={results.length > 0}
                    aria-activedescendant={selectedProduct ? `${resultsId}-${selectedProduct.id}` : undefined}
                    autoComplete="off"
                    placeholder={placeholder}
                    value={query}
                    onChange={(event) => {
                        setQuery(event.target.value);
                        setSelectedIndex(0);
                    }}
                    onKeyDown={handleKeyDown}
                    className="h-11 w-full rounded-xl border border-input bg-background pr-3 pl-10 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring"
                />
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
                <button
                    type="button"
                    aria-pressed={naturalTurfOnly}
                    onClick={() => {
                        setNaturalTurfOnly((value) => !value);
                        setSelectedIndex(0);
                    }}
                    className={filterClass(naturalTurfOnly)}
                >
                    Natural turf
                </button>

                <button
                    type="button"
                    aria-pressed={sisisOnly}
                    onClick={() => {
                        setSisisOnly((value) => !value);
                        setSelectedIndex(0);
                    }}
                    className={filterClass(sisisOnly)}
                >
                    SISIS
                </button>
            </div>

            <div role="status" className="mt-3 text-sm text-muted-foreground">
                {loadState === "loading" && "Loading equipment search…"}
                {loadState === "error" && "Equipment search could not load."}
                {loadState === "ready" &&
                    (query.trim().length < 2
                        ? "Enter at least two characters."
                        : `${results.length} matching ${results.length === 1 ? "product" : "products"} shown.`)}
            </div>

            {loadState === "error" && (
                <button
                    type="button"
                    onClick={() => {
                        setLoadState("loading");
                        setRetryCount((count) => count + 1);
                    }}
                    className="mt-3 font-semibold text-primary underline underline-offset-4"
                >
                    Try again
                </button>
            )}

            <ul
                id={resultsId}
                role="listbox"
                aria-label="Matching equipment"
                aria-busy={loadState === "loading"}
                className="mt-3 max-h-[60vh] overflow-auto rounded-xl border border-border bg-background"
            >
                {results.map((product, index) => (
                    <li key={product.id} role="presentation">
                        <Link
                            id={`${resultsId}-${product.id}`}
                            role="option"
                            aria-selected={selectedIndex === index}
                            href={`/products/${product.id}`}
                            onClick={() => closeModal()}
                            onMouseEnter={() => setSelectedIndex(index)}
                            className={`flex items-center gap-3 px-4 py-3 transition ${
                                selectedIndex === index
                                    ? "bg-accent text-accent-foreground"
                                    : "text-foreground hover:bg-muted"
                            }`}
                        >
                            <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-border bg-card">
                                {product.image ? (
                                    <Image src={product.image} alt="" fill sizes="48px" className="object-contain" />
                                ) : (
                                    <span className="flex h-full items-center justify-center text-xs text-muted-foreground">
                                        No image
                                    </span>
                                )}
                            </div>

                            <div className="min-w-0">
                                <div className="truncate text-sm font-medium">{product.name}</div>

                                <div className="truncate text-xs text-muted-foreground">
                                    {product.brand.replace(/_/g, " ")}
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
