import { createApp } from "vue";
import { router } from "./route";
import App from "./App.vue";
import { createPinia } from "pinia";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";

// queryClient 생성
const queryClient = new QueryClient();

createApp(App)
  .use(createPinia())
  .use(router)
  .use(VueQueryPlugin, { queryClient })
  .mount("#app");
