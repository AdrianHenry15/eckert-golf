import Link from "next/link";

const cassetteOptions = [
    {
        name: "6-bladed cutting cylinder",
        description: "A cutting option for general mowing and turf presentation.",
    },
    {
        name: "8-bladed cutting cylinder",
        description: "A cutting option for sports turf and maintained grass surfaces.",
    },
    {
        name: "11-bladed cutting cylinder",
        description: "A cutting option for fine turf presentation.",
    },
    {
        name: "Scarifying cassettes",
        description: "Explore 1 mm, 2 mm, and tungsten-tipped options for turf maintenance and renovation.",
    },
];

const supportedProductIds = ["mower-1", "mower-2", "dennis-g860"];

interface DennisCassettesProps {
    productId?: string;
}

export default function DennisCassettes({ productId }: DennisCassettesProps) {
    if (productId && !supportedProductIds.includes(productId)) {
        return null;
    }

    const quoteHref = productId
        ? {
              pathname: "/contact",
              query: { product: productId },
          }
        : "/contact";

    return (
        <section
            id="dennis-cassettes"
            aria-labelledby="dennis-cassettes-heading"
            className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 text-card-foreground sm:p-8"
        >
            <div className="max-w-3xl">
                <p className="text-sm font-semibold tracking-wider text-primary uppercase">Dennis cassette systems</p>

                <h2 id="dennis-cassettes-heading" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                    More ways to maintain your turf
                </h2>

                <p className="mt-4 leading-7 text-muted-foreground">
                    Explore cassette options for the Dennis G660, G760, G860, and ES860 mower families. Match the
                    cassette to your machine, working width, and maintenance task.
                </p>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {cassetteOptions.map((cassette) => (
                    <li key={cassette.name} className="rounded-xl border border-border bg-background p-5">
                        <h3 className="text-lg font-semibold">{cassette.name}</h3>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{cassette.description}</p>
                    </li>
                ))}
            </ul>

            <p className="mt-6 text-sm leading-6 text-muted-foreground">
                Compatibility depends on the exact mower model and cassette width. Send EGS your model and serial number
                so we can confirm the correct configuration and availability.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-5">
                <Link
                    href={quoteHref}
                    className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                    Ask about cassette options
                </Link>

                <a
                    href="https://dennisuk.com/cassettes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-primary underline underline-offset-4"
                >
                    Manufacturer cassette guide
                    <span className="sr-only"> (opens in a new tab)</span>
                </a>
            </div>
        </section>
    );
}
