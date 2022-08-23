<script setup lang="ts">
import type { EventData, LngLatLike } from "mapbox-gl";
import { reactive } from "vue";

const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

const state = reactive({
  mapOptions: {
    style: "mapbox://styles/mapbox/dark-v10",
    center: [-103.5917, 40.6699] as LngLatLike,
    zoom: 3,
  },
  popupOptions: {
    visible: false,
    center: undefined,
    content: "",
  },
});

const handleClick = (e: EventData) => {
  const map = e.target;
  const features = map.queryRenderedFeatures(e.point, {
    layers: ["clusters"],
  });
  const clusterId = features[0].properties.cluster_id;
  map
    .getSource("earthquakes")
    .getClusterExpansionZoom(clusterId, (err: Error, zoom: number) => {
      if (err) return;
      map.easeTo({
        center: features[0].geometry.coordinates,
        zoom: zoom,
      });
    });
};

const handleMouseEnter = (e: EventData) => {
  e.target.getCanvas().style.cursor = "pointer";
};

const handleMouseLeave = (e: EventData) => {
  e.target.getCanvas().style.cursor = "";
};

const handleClickPoint = (e: EventData) => {
  const coordinates = e.features[0].geometry.coordinates.slice();
  const mag = e.features[0].properties.mag;
  const tsunami = e.features[0].properties.tsunami === 1 ? "yes" : "no";

  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }
  state.popupOptions.visible = true;
  state.popupOptions.content = `magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`;
  state.popupOptions.center = coordinates;
};
</script>

<template>
  <div class="container">
    <v-map :accessToken="accessToken" :options="state.mapOptions">
      <v-geo-source
        id="earthquakes"
        data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
        :cluster="true"
        :clusterMaxZoom="14"
        :clusterRadius="50"
      />
      <v-circle-layer
        id="clusters"
        source="earthquakes"
        :filter="['has', 'point_count']"
        :paint="{
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1',
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40,
          ],
        }"
        @click="handleClick"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      />
      <v-symbol-layer
        id="cluster-count"
        source="earthquakes"
        :filter="['has', 'point_count']"
        :layout="{
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12,
        }"
      />
      <v-circle-layer
        id="uncluster-point"
        source="earthquakes"
        :filter="['!', ['has', 'point_count']]"
        :paint="{
          'circle-color': '#11b4da',
          'circle-radius': 4,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
        }"
        @click="handleClickPoint"
      />
      <v-popup
        :visible="state.popupOptions.visible"
        :center="state.popupOptions.center"
      >
        <div>
          {{ state.popupOptions.content }}
        </div>
      </v-popup>
    </v-map>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  width: 100%;
}
</style>
