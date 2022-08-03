<script setup lang="ts">
import { onMounted, ref } from "vue";
import { accessToken } from "../../../utils/mapUtil";

const tiles = [
  "https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png",
  "https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",
];

const index = ref(0);

onMounted(() => {
  setInterval(() => {
    if (index.value === 0) {
      index.value = 1;
    } else index.value = 0;
  }, 2000);
});
</script>

<template>
  <div class="container">
    <v-map
      :accessToken="accessToken"
      :options="{
        center: [-74.5, 40],
        zoom: 2,
      }"
    >
      <v-raster-source id="tiles" :tiles="[tiles[index]]" :tileSize="256" />
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
