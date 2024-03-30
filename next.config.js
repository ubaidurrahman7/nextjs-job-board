/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "uuxvsjmxynhxshsu.public.blob.vercel-storage.com",
      },
    ],
  },
};

module.exports = nextConfig;
