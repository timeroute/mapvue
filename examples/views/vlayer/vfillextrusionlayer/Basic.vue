<script setup lang="ts">
import { reactive } from "vue";
import { accessToken } from "../../../utils/mapUtil";

const colors = ["#f00", "#00f", "#ff0", "#0f0", "#0ff", "#fff", "#888"];
const data = {
  type: "Feature",
  geometry: {
    type: "Polygon",
    // These coordinates outline Maine.
    coordinates: [
      [
        [-67.13734, 45.13745],
        [-66.96466, 44.8097],
        [-68.03252, 44.3252],
        [-69.06, 43.98],
        [-70.11617, 43.68405],
        [-70.64573, 43.09008],
        [-70.75102, 43.08003],
        [-70.79761, 43.21973],
        [-70.98176, 43.36789],
        [-70.94416, 43.46633],
        [-71.08482, 45.30524],
        [-70.66002, 45.46022],
        [-70.30495, 45.91479],
        [-70.00014, 46.69317],
        [-69.23708, 47.44777],
        [-68.90478, 47.18479],
        [-68.2343, 47.35462],
        [-67.79035, 47.06624],
        [-67.79141, 45.70258],
        [-67.13734, 45.13745],
      ],
    ],
  },
};

const state = reactive({
  paint: {
    "fill-extrusion-color": "#f00",
    "fill-extrusion-opacity": 1,
    "fill-extrusion-base": 0,
    "fill-extrusion-height": 0,
  },
  layout: {
    visibility: "visible",
  },
});

const handleChangeBg = () => {
  state.paint["fill-extrusion-color"] =
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
        pitch: 60,
      }"
    >
      <v-geo-source id="geo" :data="data" />
      <v-fillextrusion-layer
        id="poly"
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
        v-model="state.paint['fill-extrusion-opacity']"
      />
      <button @click="state.layout.visibility = 'visible'">显示</button>
      <button @click="state.layout.visibility = 'none'">隐藏</button>
      <input
        type="number"
        :min="0"
        :max="10000"
        :step="500"
        v-model="state.paint['fill-extrusion-base']"
      />
      <input
        type="number"
        :min="0"
        :max="10000"
        :step="500"
        v-model="state.paint['fill-extrusion-height']"
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
