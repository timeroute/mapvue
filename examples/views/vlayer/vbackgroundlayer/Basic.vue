<script setup lang="ts">
import { reactive } from "vue";
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

const colors = ["#f00", "#00f", "#ff0", "#0f0", "#0ff", "#fff", "#888"];

const state = reactive({
  paint: {
    "background-color": "#f00",
    "background-opacity": 1,
  },
  layout: {
    visibility: "visible",
  },
});

const handleChangeBg = () => {
  state.paint["background-color"] =
    colors[Math.floor(Math.random() * colors.length)];
};
</script>

<template>
  <div class="container">
    <v-map
      :accessToken="accessToken"
      :options="{
        center: [-119.5591, 37.715],
        zoom: 9,
      }"
    >
      <v-background-layer
        id="bg"
        sourceLayer="water"
        :paint="state.paint"
        :layout="state.layout"
      />
    </v-map>
    <div class="control">
      <button @click="handleChangeBg">切换背景色</button>
      <input
        type="number"
        :max="1"
        :step="0.1"
        v-model="state.paint['background-opacity']"
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
