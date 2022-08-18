<script setup lang="ts">
import { readonly, reactive } from "vue";
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

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
});

const state = reactive({
  center: [-77.4144, 25.0759],
  text: "asdfasdf",
  visible: true,
});

const handleClick = () => {
  state.text = "I'am a cat";
  state.visible = true;
};

const handleMouseEnter = (e) => {
  console.log(e);
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
        @click="handleClick"
        @mouseenter="handleMouseEnter"
      />
      <v-popup
        v-model:visible="state.visible"
        :center="state.center"
        :options="{
          anchor: 'bottom',
          closeButton: true,
          maxWidth: '400px',
        }"
      >
        <div style="color: red; font-size: 2em">
          <h2>{{ state.text }}</h2>
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
