import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "www.surrey.ac.uk",
      },
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
      },
      {
        protocol: "https",
        hostname: "awsimages.detik.net.id",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "docs.google.com",
      },
      // Wajib ada jika menggunakan gambar dari Google Drive/Docs/Photos
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "nurhahidaarini.com",
      },
    ],
  },
};

export default nextConfig;