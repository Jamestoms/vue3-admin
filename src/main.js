import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// 状态管理弃用vuex，改用pinia
import { createPinia } from "pinia";
const pinia = createPinia();
// 使用piniaPluginPersistedstate持久化存储pinia内数据，存储在本地，刷新页面数据不丢失
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
pinia.use(piniaPluginPersistedstate);

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 注册element图标组件
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(pinia).use(router).use(ElementPlus).mount("#app");
