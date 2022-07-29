<script setup lang="ts">
import { reactive } from "vue";
import { accessToken } from "../../../utils/mapUtil";

const colors = ["#f00", "#00f", "#ff0", "#0f0", "#0ff", "#fff", "#888"];

const state = reactive({
  paint: {
    "circle-color": "#f00",
    "circle-opacity": 1,
    "circle-radius": 10,
  },
  layout: {
    visibility: "visible",
  },
});

const handleChangeBg = () => {
  state.paint["circle-color"] =
    colors[Math.floor(Math.random() * colors.length)];
};
</script>

<template>
  <div class="container">
    <v-map
      :accessToken="accessToken"
      :options="{
        center: [-68.137343, 45.137451],
        zoom: 5,
      }"
    >
      <v-geo-source
        id="geo"
        data="https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_ports.geojson"
      />
      <v-circle-layer
        id="circle"
        source="geo"
        :paint="state.paint"
        :layout="state.layout"
      />
    </v-map>
    <div class="control">
      <button @click="handleChangeBg">切换背景色</button>
      <input
        type="number"
        :min="0"
        :max="1"
        :step="0.1"
        v-model="state.paint['circle-opacity']"
      />
      <button @click="state.layout.visibility = 'visible'">显示</button>
      <button @click="state.layout.visibility = 'none'">隐藏</button>
      <input
        type="number"
        :min="10"
        :max="20"
        :step="1"
        v-model="state.paint['circle-radius']"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  width: 100%;
}
.control {
  position: absolute;
  right: 0;
  top: 0;
  margin: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
