/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  turbopack: {
    root: process.cwd()
  },
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
