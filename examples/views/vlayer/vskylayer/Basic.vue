<script setup lang="ts">
import type { SkyLayout, SkyPaint } from "mapbox-gl";
import { reactive } from "vue";
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

const colors = ["#f00", "#00f", "#ff0", "#0f0", "#0ff", "#fff", "#888"];

interface IState {
  paint: SkyPaint;
  layout: SkyLayout;
}

const state = reactive<IState>({
  paint: {
    "sky-type": "atmosphere",
    "sky-atmosphere-sun": [0.0, 0.0],
    "sky-atmosphere-sun-intensity": 15,
    "sky-atmosphere-color": "white",
    "sky-opacity": 1,
  },
  layout: {
    visibility: "visible",
  },
});

const handleChangeBg = () => {
  state.paint["sky-atmosphere-color"] =
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
        pitch: 80,
      }"
    >
      <v-sky-layer
        id="sky"
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
        v-model="state.paint['sky-opacity']"
      />
      <button @click="state.layout.visibility = 'visible'">显示</button>
      <button @click="state.layout.visibility = 'none'">隐藏</button>
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
