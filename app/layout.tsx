import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import GoogleAnalytics from "@/components/analytics/google-analytics";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ModalRoot from "@/components/modals/modal-root";
import CookieConsentCard from "@/components/cookie-consent-card";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "react-hot-toast";
import { SITE_ORIGIN } from "@/lib/site";
import GlobalOptionsWidget from "@/components/settings/global-options-widget";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE_ORIGIN),
    title: {
        default: "Eckert Golf",
        template: "%s | Eckert Golf",
    },
    description:
        "Professional turf, sports field, and grounds equipment solutions for flawless greens and expert care.",
    applicationName: "Eckert Golf",
    keywords: [
        "Eckert Golf",
        "sports turf equipment",
        "grounds equipment",
        "golf course equipment",
        "field maintenance equipment",
        "turf care",
    ],
    authors: [{ name: "Eckert Golf" }],
    creator: "Eckert Golf",
    publisher: "Eckert Golf",
    icons: {
        icon: "/logos/egs-swoosh.png",
        shortcut: "/logos/egs-swoosh.png",
        apple: "/logos/egs-swoosh.png",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "/",
        siteName: "Eckert Golf",
        title: "Eckert Golf",
        description:
            "Professional turf, sports field, and grounds equipment solutions for flawless greens and expert care.",
        images: [
            {
                url: "/logos/egs-swoosh.png",
                width: 1200,
                height: 630,
                alt: "Eckert Golf",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Eckert Golf",
        description:
            "Professional turf, sports field, and grounds equipment solutions for flawless greens and expert care.",
        images: ["/logos/egs-swoosh.png"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
            >
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            name: "Eckert Golf Sales, Inc.",
                            alternateName: "Eckert Golf",
                            url: SITE_ORIGIN,
                            telephone: "+1-407-629-7968",
                            address: {
                                "@type": "PostalAddress",
                                streetAddress: "5415 Lake Howell Road #190",
                                addressLocality: "Winter Park",
                                addressRegion: "FL",
                                postalCode: "32792",
                                addressCountry: "US",
                            },
                        }).replace(/</g, "\\u003c"),
                    }}
                />
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <Toaster />
                    <a
                        href="#page-content"
                        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
                    >
                        Skip to content
                    </a>
                    <Navbar />
                    <div id="page-content" tabIndex={-1} className="scroll-mt-24">
                        {children}
                    </div>
                    <ModalRoot />
                    <CookieConsentCard />
                    <GoogleAnalytics />
                    <GlobalOptionsWidget />
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
