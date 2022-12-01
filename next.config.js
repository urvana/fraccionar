/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    defaultLocale: "es",
    locales: ["es"],
  }
};

module.exports = nextConfig;
