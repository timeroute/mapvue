<script setup lang="ts">
import type { Style } from "mapbox-gl";
import { reactive, ref, watch } from "vue";
import * as Compare from "mapbox-gl-compare";
import "mapbox-gl-compare/dist/mapbox-gl-compare.css";

const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

interface IState {
  style1: Style | string;
  style2: Style | string;
}

const compareContainer = ref<HTMLElement>();
const mapRef1 = ref<HTMLElement>();
const mapRef2 = ref<HTMLElement>();

const state = reactive<IState>({
  style1: "mapbox://styles/mapbox/dark-v10",
  style2: "mapbox://styles/mapbox/light-v10",
});

const handleLoaded = () => {
  console.log("loaded");
};

watch(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  () => mapRef1.value?.map && mapRef2.value?.map,
  (loaded) => {
    if (loaded) {
      new Compare(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        mapRef1.value!.map,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        mapRef2.value!.map,
        compareContainer.value
      );
    }
  }
);
</script>

<template>
  <div class="container" ref="compareContainer">
    <v-map
      ref="mapRef1"
      :accessToken="accessToken"
      :options="{
        center: [120, 30],
        zoom: 4,
        style: state.style1,
      }"
      @loaded="handleLoaded"
    />
    <v-map
      ref="mapRef2"
      :accessToken="accessToken"
      :options="{
        center: [120, 30],
        zoom: 4,
        style: state.style2,
      }"
      @loaded="handleLoaded"
    />
  </div>
</template>

<style scoped>
.container {
  position: relative;
  height: 100vh;
  width: 100%;
  user-select: none;
  overflow: hidden;
}
</style>
