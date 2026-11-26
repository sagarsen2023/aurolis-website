import { defineConfig, loadEnv, type Plugin } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

function siteUrl(url: string): Plugin {
  return {
    name: "site-url",
    configResolved(config) {
      if (!url && config.command === "build") {
        config.logger.warn(
          "VITE_PUBLIC_SITE_URL is not set, so link previews use relative URLs.",
        );
      }
    },
    transformIndexHtml: {
      order: "pre",
      handler: (html) => ({
        html: html.replaceAll("%SITE_URL%", url),
        tags: url
          ? [
              {
                tag: "link",
                attrs: { rel: "canonical", href: `${url}/` },
                injectTo: "head",
              },
            ]
          : [],
      }),
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_PUBLIC_");
  const url = (env.VITE_PUBLIC_SITE_URL ?? "").replace(/\/+$/, "");

  return {
    plugins: [
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
      }),
      react(),
      tailwindcss(),
      siteUrl(url),
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
    },
  };
});
