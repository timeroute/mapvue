<script setup lang="ts">
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
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
        interactive: false,
        style: 'mapbox://styles/mapbox/satellite-streets-v11',
      }"
    >
      <v-fog color="#242B4B" :range="[-1, 2]" :horizon-blend="0.2" />
      <v-rasterdem-source
        id="tiles"
        url="mapbox://mapbox.terrain-rgb"
        :tileSize="512"
        :maxzoom="14"
      />
    </v-map>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  width: 100%;
}
</style>
