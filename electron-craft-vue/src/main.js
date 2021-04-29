import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import electron from "electron";
createApp(App).use(router).use(electron).mount("#app");
