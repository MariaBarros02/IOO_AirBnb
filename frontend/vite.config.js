import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiUrl = env.VITE_API_URL;
  return {
    plugins: [
      react(),
      VitePWA({
        devOptions: { enabled: true },
        registerType: "autoUpdate",
        includeAssets: ["favicon.ico", "apple-touch-icon-180x180.png"],
        manifest: {
          name: "TuEmpresa AirBnb",
          short_name: "TuAirBnb",
          description: "Plataforma de reservas de hospedajes",
          theme_color: "#0891b2", // el cyan que ya usas en tu Navegacion
          background_color: "#ffffff",
          display: "standalone",
          scope: "/",
          start_url: "/",
          icons: [
            {
              src: "pwa-64x64.png",
              sizes: "64x64",
              type: "image/png",
            },
            {
              src: "pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "maskable-icon-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
        },
        workbox: {
          // NO cachear las llamadas a tu API (login, perfil, reservas)
          // porque necesitas datos frescos y cookies httpOnly funcionando
          runtimeCaching: [
            {
              urlPattern: new RegExp(
                `^${apiUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/.*`,
              ),
              handler: "NetworkOnly",
            },
          ],
        },
      }),
    ],
    optimizeDeps: {
      include: ["leaflet"],
    },
  };
});
