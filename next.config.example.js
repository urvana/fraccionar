const NEXT_PUBLIC_SUPABASE_ID = process.env.NEXT_PUBLIC_SUPABASE_ID;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  swcMinify: true,
  i18n: {
    defaultLocale: "es",
    locales: ["es"],
  },
  env: {
    apiUrl: 'url de api',
    apiKey:'key de api'
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [`${NEXT_PUBLIC_SUPABASE_ID}.supabase.co`],
  },
};

module.exports = nextConfig;
