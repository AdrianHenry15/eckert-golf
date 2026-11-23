import { NavMenuType } from "./types/navigation";

export const NavMenu: NavMenuType[] = [
    {
        title: "Home",
        link: "/",
    },
    {
        title: "Products",
        link: "",
    },
    {
        title: "Events",
        link: "/events",
    },
    // Parts Order Form
    {
        title: "Parts Form",
        link: "/parts-form",
    },
    {
        title: "About",
        link: "/about",
    },
    {
        title: "Finance Options",
        link: "/finance-options",
    },
];
export const ProductsMenuItems: NavMenuType[] = [
    {
        title: "All Products",
        link: "/products",
    },
    {
        title: "Debris Blowers",
        value: "debris_blower",
        link: "/products?category=debris_blower",
    },
    {
        title: "Goals",
        value: "goal",
        link: "/products?category=goal",
    },
    {
        title: "Line Markers",
        value: "line_marker",
        link: "/products?category=line_marker",
    },
    {
        title: "Natural Turf",
        value: "natural_turf",
        link: "/products?category=natural_turf",
    },
    {
        title: "Synthetic Turf",
        value: "synthetic_turf",
        link: "/products?category=synthetic_turf",
    },
];
