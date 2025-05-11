import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Базовые настройки Next.js */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets-ng.maxroll.gg",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  /* Фикс для Prisma на Vercel */
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Указываем Webpack, где искать сгенерированный Prisma-клиент
      config.resolve.alias["@prisma/client"] =
        require.resolve("@prisma/client");

      // Игнорируем предупреждения о неоптимальных зависимостях (опционально)
      config.ignoreWarnings = [{ module: /@prisma\/client/ }];
    }
    return config;
  },
};

export default nextConfig;
