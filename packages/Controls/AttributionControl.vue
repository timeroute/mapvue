<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import type { IControl } from "mapbox-gl";
import { inject, onMounted, onUnmounted, shallowRef } from "vue";
import { mapvueSymbol } from "../symbols";

interface Props {
  compact?: boolean | undefined;
  customAttribution?: string | string[] | undefined;
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
