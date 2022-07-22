import { createApp } from "vue";
import MapVue from "../dist/mapvue";
import "../dist/style.css";
// import MapVue from "../packages";
import App from "./App.vue";

import "./main.css";

createApp(App).use(MapVue).mount("#app");
