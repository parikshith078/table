/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig

module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:4000/:path*", // Proxy to Backend
        // destination: "http://server:4000/:path*", // Proxy to Backend
      },
    ];
  },
};
