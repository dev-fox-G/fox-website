import type { NextConfig } from "next";

// Set by the GitHub Pages workflow (e.g. "/my-repo"). Empty for a custom domain or local dev.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export", // static HTML, deployable to GitHub Pages / any static host
  basePath,
  trailingSlash: true,
  images: { unoptimized: true }, // required for static export
};

export default nextConfig;
