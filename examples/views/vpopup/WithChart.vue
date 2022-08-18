<script setup lang="ts">
import type { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import type { LngLatLike } from "mapbox-gl";
import { readonly, reactive } from "vue";
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
import Chart from "./Chart.vue";

const data = readonly({
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.4144, 25.0759],
      },
    },
  ],
}) as FeatureCollection<Geometry, GeoJsonProperties>;

const state = reactive({
  center: [-77.4144, 25.0759] as LngLatLike,
  visible: false,
});

const handleMouseEnter = () => {
  state.visible = true;
};

const handleMouseLeave = () => {
  state.visible = false;
};
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
      <v-geo-source id="point" :data="data" />
      <v-circle-layer
        id="point"
        source="point"
        :paint="{
          'circle-color': 'red',
          'circle-radius': 6,
        }"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      />
      <v-popup
        v-model:visible="state.visible"
        :center="state.center"
        :options="{
          closeButton: false,
          maxWidth: '400px',
        }"
      >
        <chart />
      </v-popup>
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
