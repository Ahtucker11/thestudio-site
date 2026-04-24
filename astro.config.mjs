// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: import.meta.env.PUBLIC_SITE_URL || "https://example.com",
  output: "static",
  adapter: vercel(),
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    service: {
      config: {
        jpeg: { mozjpeg: true },
        webp: { effort: 4 },
        avif: { effort: 4 },
        png: { compressionLevel: 9 },
      },
    },
  },
});
