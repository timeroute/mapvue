<script setup lang="ts">
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
</script>

<template>
  <div class="container">
    <v-map
      :accessToken="accessToken"
      :options="{
        center: [-75.789, 41.874],
        zoom: 5,
      }"
    >
      <v-image-source
        id="tiles"
        url="https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif"
        :coordinates="[
          [-80.425, 46.437],
          [-71.516, 46.437],
          [-71.516, 37.936],
          [-80.425, 37.936],
        ]"
      />
      <v-raster-layer
        id="tiles"
        source="tiles"
        :paint="{
          'raster-fade-duration': 0,
        }"
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
