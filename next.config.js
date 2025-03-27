/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig = {
  ssr: process.env.NODE_ENV === "development" ? false : true,
  experimental: {
    serverComponentsExternalPackages: ["knex"],
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
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

module.exports = withMDX(nextConfig);
