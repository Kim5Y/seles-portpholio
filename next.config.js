/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/", destination: "/index.html" },
      { source: "/contact", destination: "/contact-us.html" },
      { source: "/booking", destination: "/booking.html" },
      { source: "/gallery", destination: "/Gallery/Gallery.html" }
    ];
  },
  async redirects() {
    return [
      { source: "/contact-us.html", destination: "/contact", permanent: true },
      { source: "/booking.html", destination: "/booking", permanent: true },
      { source: "/Gallery/Gallery.html", destination: "/gallery", permanent: true }
    ];
  }
};

module.exports = nextConfig;
