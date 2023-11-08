/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path(.*)",
        destination: `${process.env.NEXT_API_DOMAIN}/:path*`,
        // has: [{ type: "cookie", key: "token" }],
      },
    ];
  },
};

module.exports = nextConfig
