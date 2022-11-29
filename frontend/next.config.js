/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    i18n: {
        locales: ['en-US', 'pt', 'es'],

        defaultLocale: 'en-US',
    }
};

module.exports = nextConfig;
