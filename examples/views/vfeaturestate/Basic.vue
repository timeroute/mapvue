<script setup lang="ts">
import { reactive } from "vue";
import { accessToken } from "../../utils/mapUtil";

const state = reactive({
  hoverId: undefined,
});

const handleMouseMove = (e) => {
  if (e.features.length > 0) {
    state.hoverId = e.features[0].id;
    console.log(state.hoverId);
  }
};

const handleMouseLeave = () => {
  state.hoverId = undefined;
};
</script>

<template>
  <div class="container">
    <v-map
      :accessToken="accessToken"
      :options="{
        center: [-100.486052, 37.830348],
        zoom: 2,
      }"
    >
      <v-geo-source
        id="states"
        data="https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson"
      />
      <v-fill-layer
        id="states"
        source="states"
        :paint="{
          'fill-color': '#627BC1',
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0.5,
          ],
        }"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
      />
      <v-feature-state
        :feature="{
          source: 'states',
          id: state.hoverId,
        }"
        :state="{ hover: true }"
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
