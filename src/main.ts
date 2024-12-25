// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/pico-css/css/pico.min.css";
import "./assets/pico-css/css/pico.colors.min.css";
import "./assets/style.css";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount("#app");

export { pinia };
