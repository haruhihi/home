/** @type {import('next').NextConfig} */
const nextConfig = {
  // or might on mount twice https://stackoverflow.com/questions/71835580/useeffect-being-called-twice-in-nextjs-typescript-app
  reactStrictMode: false,
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/home/plan/search",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
