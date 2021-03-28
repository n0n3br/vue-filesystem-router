import { createApp } from "vue";
import App from "./App.vue";
import vueFsRouter from "./plugins/vue-fs-router";
createApp(App).use(vueFsRouter).mount("#app");
