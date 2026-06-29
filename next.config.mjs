/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output bundles everything needed to run the app into
  // .next/standalone — no node_modules needed on the production VM.
  // See: https://nextjs.org/docs/app/api-reference/config/next-config-js/output
  output: "standalone",
};

export default nextConfig;
