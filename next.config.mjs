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
  /**
   * https://github.com/vercel/next.js/discussions/50587#discussioncomment-6134092
   * Fix sequelize error:
   */
  experimental: {
    serverComponentsExternalPackages: ["sequelize"],
  },
};

export default nextConfig;
