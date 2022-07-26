<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import type { IControl } from "mapbox-gl";
import { inject, onMounted, onUnmounted, shallowRef } from "vue";
import { mapvueSymbol } from "../symbols";

interface Props {
  showCompass?: boolean | undefined;
  showZoom?: boolean | undefined;
  visualizePitch?: boolean | undefined;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | undefined;
}

const control = shallowRef<IControl>();
const props = defineProps<Props>();
const map = inject(mapvueSymbol);

onMounted(() => {
  if (!map) return;
  control.value = new mapboxgl.NavigationControl({
    showCompass: props.showCompass || false,
    showZoom: props.showZoom || false,
    visualizePitch: props.visualizePitch || false,
  });
  map.value.addControl(control.value, props.position || "top-right");
});

onUnmounted(() => {
  if (!map || !control.value) return;
  map.value.removeControl(control.value);
});
</script>

<template></template>
