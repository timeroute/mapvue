<script setup lang="ts">
import { reactive } from "vue";
import { accessToken } from "../../../utils/mapUtil";

const state = reactive({
  paint: {},
  layout: {
    "icon-image": "cat",
    "icon-size": 1,
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
        zoom: 5,
      }"
    >
      <v-sprite
        name="cat"
        url="https://docs.mapbox.com/mapbox-gl-js/assets/cat.png"
      />
      <v-geo-source
        id="geo"
        data="https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_ports.geojson"
      />
      <v-symbol-layer
        id="symbol"
        source="geo"
        :paint="state.paint"
        :layout="state.layout"
      />
    </v-map>
    <div class="control">
      <input
        type="number"
        :min="0"
        :max="1"
        :step="0.1"
        v-model="state.layout['icon-size']"
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
