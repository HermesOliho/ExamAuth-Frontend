import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
    server: {
        host: "0.0.0.0",
        https: {
            key: "/media/hermes/Projets/Projets/Laravel/ExamAuth-Backend/ssl/localhost+2-key.pem",
            cert: "/media/hermes/Projets/Projets/Laravel/ExamAuth-Backend/ssl/localhost+2.pem",
            // key: "/etc/ssl/mkcert/localhost+3-key.pem",
            // cert: "/etc/ssl/mkcert/localhost+3.pem",
        },
    },
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
