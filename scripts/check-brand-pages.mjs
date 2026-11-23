const origin = process.env.CHECK_ORIGIN ?? "http://localhost:3000";

const expectedFirstProducts = {
    sisis: "sisis-rotorake-600hdx",
    dennis: "mower-2",
    pitchmark: "lmm-1",
    "buffalo-turbine": "buffalo-turbine-cyclone-kb7",
    "syn-pro": "syn-1",
    "harrod-sport": "sgp-4",
};

const productIds = [
    "sisis-rotorake-600hdx",
    "sisis-supaturfman",
    "dennis-es34r",
    "dennis-pro34r",
    "buffalo-turbine-cyclone-kb7",
];

let failures = 0;

function check(condition, message) {
    if (condition) {
        console.log(`PASS ${message}`);
    } else {
        console.error(`FAIL ${message}`);
        failures += 1;
    }
}

async function getPage(pathname) {
    const response = await fetch(new URL(pathname, origin), {
        redirect: "manual",
        signal: AbortSignal.timeout(30_000),
    });

    check(response.status === 200, `${pathname}: HTTP ${response.status}`);

    return response.status === 200 ? response.text() : null;
}

function getStructuredData(html) {
    return [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].flatMap(
        (match) => {
            const value = JSON.parse(match[1]);
            return Array.isArray(value) ? value : [value];
        },
    );
}

for (const [brand, firstProductId] of Object.entries(expectedFirstProducts)) {
    const pathname = `/brands/${brand}`;

    try {
        const html = await getPage(pathname);
        if (html === null) continue;

        const schemas = getStructuredData(html);
        const collection = schemas.find((schema) => schema["@type"] === "CollectionPage");

        check(Boolean(collection), `${pathname}: collection schema exists`);
        check(
            schemas.some((schema) => schema["@type"] === "BreadcrumbList"),
            `${pathname}: breadcrumb schema exists`,
        );

        if (!collection) continue;

        const list = collection.mainEntity;
        const items = list?.itemListElement ?? [];

        check(items.length > 0, `${pathname}: collection contains products`);
        check(list.numberOfItems === items.length, `${pathname}: product count matches`);

        check(
            items.every((item, index) => item.position === index + 1),
            `${pathname}: positions are sequential`,
        );

        check(
            new Set(items.map((item) => item.item)).size === items.length,
            `${pathname}: collection has no duplicate products`,
        );

        check(
            items.length > 0 && new URL(items[0].item).pathname === `/products/${firstProductId}`,
            `${pathname}: intended product is featured first`,
        );

        check(
            items.every((item) => html.includes(`href="${new URL(item.item).pathname}"`)),
            `${pathname}: collection products have rendered links`,
        );
    } catch (error) {
        check(false, `${pathname}: ${error.message}`);
    }
}

for (const id of productIds) {
    try {
        await getPage(`/products/${id}`);
    } catch (error) {
        check(false, `/products/${id}: ${error.message}`);
    }
}

console.log(`\n${failures === 0 ? "All checks passed." : `${failures} checks failed.`}`);
process.exitCode = failures === 0 ? 0 : 1;
