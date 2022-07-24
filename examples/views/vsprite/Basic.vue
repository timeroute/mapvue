<script setup lang="ts">
import { reactive } from "vue";
import { accessToken } from "../../utils/mapUtil";

const state = reactive({
  center: [-77.432, 25.0306],
  draggable: false,
  scale: 1,
});
</script>

<template>
  <div class="container">
    <v-map
      :accessToken="accessToken"
      :options="{
        center: state.center,
        zoom: 10,
      }"
    >
      <v-sprite
        name="cat"
        url="https://docs.mapbox.com/mapbox-gl-js/assets/cat.png"
      />
      <v-geo-source
        id="point"
        :data="{
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [-77.4144, 25.0759],
              },
            },
          ],
        }"
      />
      <v-symbol-layer
        id="point"
        source="point"
        :layout="{
          'icon-image': 'cat',
          'icon-size': 0.5,
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
.control {
  position: absolute;
  right: 0;
  top: 0;
  margin: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: white;
  padding: 8px;
}
</style>
