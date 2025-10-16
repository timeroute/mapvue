<script setup lang="ts">
import type { Style } from "mapbox-gl";
import { reactive } from "vue";
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

interface IState {
  style: Style | string;
}

const state = reactive<IState>({
  style: "mapbox://styles/mapbox/dark-v10",
});

const handleLoaded = () => {
  alert("loaded");
  state.style = {
    version: 8,
    name: "custom",
    layers: [
      {
        id: "bg",
        type: "background",
      },
    ],
    sources: {},
  };
};
</script>

<template>
  <div class="container">
    <v-map :accessToken="accessToken" :options="{
      center: [120, 30],
      zoom: 4,
      style: state.style,
    }" @loaded="handleLoaded" />
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  width: 100%;
}
</style>
