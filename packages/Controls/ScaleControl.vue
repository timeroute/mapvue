<script setup lang="ts">
import mapboxgl, { IControl } from "mapbox-gl";
import { inject, onMounted, onUnmounted, shallowRef } from "vue";
import { mapvueSymbol } from "../symbols";

interface Props {
  maxWidth?: number | undefined;
  unit?: string | undefined;
  position:
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
  control.value = new mapboxgl.ScaleControl({
    maxWidth: props.maxWidth ?? 100,
    unit: props.unit || "metric",
  });
  map.value.addControl(control.value, props.position || "top-right");
});

onUnmounted(() => {
  if (!map || !control.value) return;
  map.value.removeControl(control.value);
});
</script>

<template></template>
