import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { store } from "./store/store";
import router from "./router/router";
import "element-plus/dist/index.css";
import Highcharts from "highcharts";
import VueHighcharts from "vue-highcharts";

const app = createApp(App)
  .use(router)
  .use(store)
  .use(VueHighcharts, { Highcharts });
store.dispatch("auth/autoLogin").then(() => {
  app.mount("#app");
});
