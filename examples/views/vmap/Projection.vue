<script setup lang="ts">
import type { Style } from "mapbox-gl";
import { reactive } from "vue";
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

interface IState {
  proj: "albers" | "equalEarth" | "equirectangular" | "lambertConformalConic" | "mercator" | "naturalEarth" | "winkelTripel" | "globe";
}

const state = reactive<IState>({
  proj: "globe",
});

const handleLoaded = () => {};
</script>

<template>
  <div class="container">
    <v-map
      :accessToken="accessToken"
      :options="{
        center: [0, 0],
        zoom: 1,
        style: 'mapbox://styles/mapbox/streets-v11',
        projection: {
          name: state.proj,
        },
      }"
      @loaded="handleLoaded"
    />
    <div class="control">
      <select v-model="state.proj">
        <option value="mercator">web墨卡托</option>
        <option value="naturalEarth">自然地球</option>
        <option value="globe">球</option>
        <option value="equalEarth">平等地球</option>
        <option value="albers">阿尔伯斯</option>
      </select>
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
  top: 0;
  right: 0;
  padding: 12px;
}
</style>
