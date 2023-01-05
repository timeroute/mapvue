<script setup lang="ts">
import type { Style } from "mapbox-gl";
import { reactive, ref, watch } from "vue";
import sync from "@mapbox/mapbox-gl-sync-move";

const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

interface IState {
  style1: Style | string;
  style2: Style | string;
}

const mapRef1 = ref<unknown>();
const mapRef2 = ref<unknown>();
const load1 = ref<boolean>(false);
const load2 = ref<boolean>(false);

const state = reactive<IState>({
  style1: "mapbox://styles/mapbox/dark-v10",
  style2: "mapbox://styles/mapbox/light-v10",
});

const handleLoaded1 = () => {
  load1.value = true;
};

const handleLoaded2 = () => {
  load2.value = true;
};

watch(
  () => load1.value && load2.value,
  (loaded) => {
    if (loaded) {
      sync(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        mapRef1.value!.map,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        mapRef2.value!.map
      );
    }
  }
);
</script>

<template>
  <div class="container">
    <div style="flex: 1; position: relative">
      <v-map
        ref="mapRef1"
        :accessToken="accessToken"
        :options="{
          center: [120, 30],
          zoom: 4,
          style: state.style1,
        }"
        @loaded="handleLoaded1"
      />
    </div>
    <div style="flex: 1; position: relative">
      <v-map
        ref="mapRef2"
        :accessToken="accessToken"
        :options="{
          center: [120, 30],
          zoom: 4,
          style: state.style2,
        }"
        @loaded="handleLoaded2"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  width: 100%;
  display: flex;
}
</style>
