import { createApp } from "vue";
import MapVue from "../packages";
import "mapbox-gl/dist/mapbox-gl.css";
// import MapVue from "../dist/mapvue";
// import "../dist/style.css";
import App from "./App.vue";
import router from "./router";
import "./main.css";

createApp(App).use(MapVue).use(router).mount("#app");
