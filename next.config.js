/** @type {import('next').NextConfig} */
const nextConfig = {
  ssr: process.env.NODE_ENV === "development" ? false : true,
  experimental: {
    serverComponentsExternalPackages: ["knex"],
  },
  async headers() {
    return [
      {
        source: "/uploads/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store", // Prevent caching for uploaded files
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
