<script setup lang="ts">
import { reactive } from "vue";
import { accessToken } from "../../../utils/mapUtil";

const state = reactive({
  paint: {
    "heatmap-color": [
      "interpolate",
      ["linear"],
      ["heatmap-density"],
      0,
      "rgba(33,102,172,0)",
      0.2,
      "rgb(103,169,207)",
      0.4,
      "rgb(209,229,240)",
      0.6,
      "rgb(253,219,199)",
      0.8,
      "rgb(239,138,98)",
      1,
      "rgb(178,24,43)",
    ],
    "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 9, 0],
    "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 9, 20],
    "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 9, 3],
  },
  layout: {
    visibility: "visible",
  },
});
</script>

<template>
  <div class="container">
    <v-map
      :accessToken="accessToken"
      :options="{
        center: [-68.137343, 45.137451],
        zoom: 3,
      }"
    >
      <v-geo-source
        id="geo"
        data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
      />
      <v-heatmap-layer
        id="heatmap"
        source="geo"
        :paint="state.paint"
        :layout="state.layout"
      />
    </v-map>
    <div class="control">
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
