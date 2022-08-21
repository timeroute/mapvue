<script setup lang="ts">
import type { Fog } from "mapbox-gl";
import { reactive } from "vue";

const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

interface IState {
  fog: Fog;
  visible: boolean;
}

const state = reactive<IState>({
  fog: {
    color: "#242b4b",
    range: [-1, 2],
    "horizon-blend": 0.2,
  },
  visible: true,
});
</script>

<template>
  <div class="container">
    <v-map
      :accessToken="accessToken"
      :options="{
        center: [6.6301, 45.35625],
        zoom: 13,
        pitch: 80,
        bearing: 160,
        interactive: true,
        style: 'mapbox://styles/mapbox/satellite-streets-v11',
      }"
    >
      <v-fog
        v-if="state.visible"
        :color="state.fog.color"
        :range="state.fog.range"
        :horizon-blend="state.fog['horizon-blend']"
      />
    </v-map>
    <div class="control">
      <button @click="state.visible = true">Init Fog</button>
      <button @click="state.visible = false">Clear Fog</button>
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
