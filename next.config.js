/** @type {import('next').NextConfig} */
const nextConfig = {
  ssr: process.env.NODE_ENV === "development" ? false : true,
};

module.exports = nextConfig;
