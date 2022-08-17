<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import type { IControl } from "mapbox-gl";
import { inject, onMounted, onUnmounted, shallowRef } from "vue";
import { mapvueSymbol } from "../symbols";

interface Props {
  showCompass?: boolean;
  showZoom?: boolean;
  visualizePitch?: boolean;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

const control = shallowRef<IControl>();
const props = defineProps<Props>();
const map = inject(mapvueSymbol, undefined);

onMounted(() => {
  if (!map) return;
  control.value = new mapboxgl.NavigationControl({
    showCompass: props.showCompass || true,
    showZoom: props.showZoom || true,
    visualizePitch: props.visualizePitch || false,
  });
  map.value.addControl(control.value, props.position || "top-left");
});

onUnmounted(() => {
  if (!map || !control.value) return;
  map.value.removeControl(control.value);
});
</script>

<template></template>
