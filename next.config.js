const NEXT_PUBLIC_SUPABASE_ID = process.env.NEXT_PUBLIC_SUPABASE_ID;
const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const NEXT_PUBLIC_SUPABASE_KEY_PUBLIC = process.env.NEXT_PUBLIC_SUPABASE_KEY_PUBLIC;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  swcMinify: true,
  i18n: {
    defaultLocale: "es",
    locales: ["es"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [`${NEXT_PUBLIC_SUPABASE_ID}.supabase.co`],
  },
};

module.exports = nextConfig;
