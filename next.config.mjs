/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output bundles everything needed to run the app into
  // .next/standalone — no node_modules needed on the production VM.
  // See: https://nextjs.org/docs/app/api-reference/config/next-config-js/output
  output: "standalone",

  // Mount this app under /ms39 so it coexists with the main hospital site
  // at amanateyehospital.com without any path conflicts.
  // basePath   — all Next.js routes are served under /ms39
  // assetPrefix — static assets (_next/static) are requested as /ms39/_next/static,
  //               which lets Azure Application Gateway correctly route them to this
  //               VMSS backend instead of the App Service backend.
  basePath: "/ms39",
  assetPrefix: "/ms39",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
