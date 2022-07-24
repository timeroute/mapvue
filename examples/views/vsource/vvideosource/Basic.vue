<script setup lang="ts">
import { accessToken } from "../../../utils/mapUtil";
</script>

<template>
  <div class="container">
    <v-map
      :accessToken="accessToken"
      :options="{
        center: [-122.514426, 37.562984],
        zoom: 17,
        minZoom: 14,
        bearing: -96,
      }"
    >
      <v-raster-source
        id="satellite"
        url="mapbox://mapbox.satellite"
        :tileSize="256"
      />
      <v-video-source
        id="tiles"
        :urls="[
          'https://static-assets.mapbox.com/mapbox-gl-js/drone.mp4',
          'https://static-assets.mapbox.com/mapbox-gl-js/drone.webm',
        ]"
        :coordinates="[
          [-122.51596391201019, 37.56238816766053],
          [-122.51467645168304, 37.56410183312965],
          [-122.51309394836426, 37.563391708549425],
          [-122.51423120498657, 37.56161849366671],
        ]"
      />
      <v-raster-layer id="satellite" source="satellite" />
      <v-raster-layer id="tiles" source="tiles" />
    </v-map>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  width: 100%;
}
</style>
