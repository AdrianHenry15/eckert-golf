import { StaticImageData } from "next/image";

export type BrandHero = {
    src: StaticImageData | string;
    alt: string;
    position?: string;
};

export const brandHeroes: Record<string, BrandHero> = {
    sisis: {
        src: "/splash/rotorake-mk5.jpeg",
        alt: "SISIS Auto Rotorake MK5 turf maintenance equipment",
        position: "center",
    },
    dennis: {
        src: "/splash/dennis-splash.jpg",
        alt: "Dennis turf maintenance equipment",
        position: "center",
    },
    pitchmark: {
        src: "/splash/pitchmark-splash.webp",
        alt: "Pitchmark sports field line marking equipment",
        position: "center",
    },
    "buffalo-turbine": {
        src: "/splash/buffalo-turbine-splash.jpg",
        alt: "Buffalo Turbine debris blowing equipment",
        position: "center",
    },
    "syn-pro": {
        src: "/splash/synpro-sisis-splash.jpg",
        alt: "Syn-Pro synthetic turf maintenance equipment",
        position: "center",
    },
    "harrod-sport": {
        src: "/splash/harrod-sport-splash.webp",
        alt: "Harrod Sport goals and sports field equipment",
        position: "center",
    },
};
