/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            { source: "/contact-us", destination: "/contact", permanent: true },
            { source: "/parts-services", destination: "/parts-form", permanent: true },
        ];
    },
};

export default nextConfig;
