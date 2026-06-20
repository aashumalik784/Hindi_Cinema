/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "archive.org" },
      { protocol: "https", hostname: "image.tmdb.org" }
    ]
  }
}
module.exports = nextConfig
