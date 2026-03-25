import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{hostname: "images.unsplash.com", protocol: "https"},{hostname: "i.pravatar.cc", protocol: "https"}],
  },
};

export default nextConfig;
