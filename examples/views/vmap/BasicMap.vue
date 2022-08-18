<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import { reactive } from "vue";
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
const state = reactive({
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
  } as mapboxgl.Style;
};
</script>

<template>
  <div class="container">
    <v-map
      :accessToken="accessToken"
      :options="{
        center: [120, 30],
        zoom: 4,
        style: state.style,
      }"
      @loaded="handleLoaded"
    />
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  width: 100%;
}
</style>
