import type { NextConfig } from "next";

// Baseline security headers for every response. HSTS is ignored by browsers
// on plain-HTTP localhost, so it is safe in dev too.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  // No "X-Powered-By: Next.js" (one less fingerprint).
  poweredByHeader: false,
  experimental: {
    // The root layout lives under the dynamic `[lang]` segment, so every 404
    // (unknown slug, unknown path) is served by `app/global-not-found.tsx`.
    globalNotFound: true,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
