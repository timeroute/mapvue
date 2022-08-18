<script setup lang="ts">
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
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
      <v-rasterdem-source
        id="tiles"
        url="mapbox://mapbox.mapbox-terrain-dem-v1"
      />
      <v-hillshade-layer id="tiles" source="tiles" />
    </v-map>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  width: 100%;
}
</style>
