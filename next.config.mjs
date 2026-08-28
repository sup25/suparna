/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
    /* Project images are wide screenshots; these are the sizes actually
       requested by the bento grid and case-study covers. */
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },

  /* Keep Turbopack's workspace root pinned here. A stray package-lock.json in
     the home directory otherwise makes Next infer C:\Users\ASUS as the root. */
  turbopack: {
    root: import.meta.dirname,
  },

  poweredByHeader: false,

  /* Case studies that left /work. Three were reclassified as side projects and
     are covered by that section; Phone Sentrix was dropped altogether, so it
     lands on the home page rather than a section that never mentions it.
     Either way the already-indexed URLs redirect instead of 404ing. */
  async redirects() {
    const movedToSideProjects = [
      "data-analyst-job-market-insights",
      "remix-store",
      "nextjs-ecommerce-store",
    ];

    return [
      ...movedToSideProjects.map((slug) => ({
        source: `/work/${slug}`,
        destination: "/#side-projects",
        permanent: true,
      })),
      { source: "/work/phone-sentrix", destination: "/", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
