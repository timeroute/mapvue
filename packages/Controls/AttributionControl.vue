<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import type { IControl } from "mapbox-gl";
import { inject, onMounted, onUnmounted, shallowRef } from "vue";
import { mapvueSymbol } from "../symbols";

const control = shallowRef<IControl>();
const props = defineProps<{
  compact?: boolean;
  customAttribution?: string | string[];
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}>();
const map = inject(mapvueSymbol, undefined);

onMounted(() => {
  if (!map) return;
  control.value = new mapboxgl.AttributionControl({
    compact: props.compact || false,
    customAttribution: props.customAttribution,
  });
  map.value.addControl(control.value, props.position || "bottom-right");
});

onUnmounted(() => {
  if (!map || !control.value) return;
  map.value.removeControl(control.value);
});
</script>

<template></template>
