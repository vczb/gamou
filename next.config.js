/** @type {import('next').NextConfig} */
const nextConfig = {
  ssr: process.env.NODE_ENV === "development" ? false : true,
  experimental: {
    serverComponentsExternalPackages: ["knex"],
  },
};

module.exports = nextConfig;
