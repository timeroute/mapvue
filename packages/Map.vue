<script lang="ts" setup>
import { computed, onMounted, onUnmounted, provide, ref, watch } from "vue";
import mapboxgl, { Map, LngLatLike } from "mapbox-gl";
import type { MapboxOptions } from "./types";
import "mapbox-gl/dist/mapbox-gl.css";
import { mapvueSymbol } from "./symbols";

interface Props {
  accessToken: string;
  options?: MapboxOptions;
}

const props = defineProps<Props>();

const mapRef = ref<HTMLElement>();
const map = ref<Map>();
const loaded = ref<boolean>(false);

provide(
  mapvueSymbol,
  computed(() => map.value)
);

watch(
  () => props.options?.center,
  (center) => {
    if (map.value) {
      map.value.flyTo({
        center: center as LngLatLike,
      });
    }
  }
);

watch(
  () => props.options?.zoom,
  (zoom) => {
    if (map.value) {
      map.value.flyTo({
        zoom,
      });
    }
  }
);

watch(
  () => props.options?.pitch,
  (pitch) => {
    if (map.value) {
      map.value.flyTo({
        pitch,
      });
    }
  }
);

watch(
  () => props.options?.bearing,
  (bearing) => {
    if (map.value) {
      map.value.flyTo({
        bearing,
      });
    }
  }
);

watch(
  () => props.options?.style,
  () => {
    if (!map.value) return;
    if (!props.options?.style) return;
    if (props.options.style instanceof Object) {
      map.value?.setStyle(props.options.style, {
        diff: true,
      });
    } else {
      map.value.setStyle(props.options.style);
    }
  }
);

onMounted(() => {
  mapboxgl.accessToken = props.accessToken;
  if (mapRef.value) {
    map.value = new Map({
      container: mapRef.value,
      attributionControl: props.options?.attributionControl || true,
      antialias: props.options?.antialias || false,
      center: props.options?.center || ([120, 30] as mapboxgl.LngLatLike),
      zoom: props.options?.zoom || 2,
      style: props.options?.style || "mapbox://style/mapbox/streets-v11",
      bearing: props.options?.bearing || 0,
      pitch: props.options?.pitch || 0,
    });
    map.value.on("load", () => {
      loaded.value = true;
    });
  }
});

onUnmounted(() => {
  if (map.value) map.value.remove();
});
</script>

<template>
  <div ref="mapRef" class="map" />
  <slot v-if="loaded" />
</template>

<style scoped>
.map {
  height: 100%;
  width: 100%;
}
</style>
