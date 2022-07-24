import { createApp } from "vue";
import MapVue from "../packages";
// import MapVue from "../dist/mapvue";
// import "../dist/style.css";
import App from "./App.vue";

import "./main.css";
import router from "./router";

createApp(App).use(MapVue).use(router).mount("#app");
