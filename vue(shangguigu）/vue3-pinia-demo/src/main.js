import { createApp } from "vue";
import { createPinia } from "pinia";
//导入持久化插件
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";

const pinia = createPinia();
// 注册持久化插件 - 必须在 use(pinia) 之前
pinia.use(piniaPluginPersistedstate);
createApp(App).use(pinia).mount("#app");