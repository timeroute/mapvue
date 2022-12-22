<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import type { IControl, ScaleControl } from "mapbox-gl";
import { inject, onMounted, onUnmounted, shallowRef, watch } from "vue";
import { mapvueSymbol } from "../symbols";

interface Props {
  maxWidth?: number;
  unit?: "imperial" | "metric" | "nautical";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

const control = shallowRef<IControl>();
const props = defineProps<Props>();
const map = inject(mapvueSymbol, undefined);

watch(
  () => props.unit,
  () => {
    if (props.unit) {
      (control.value as ScaleControl).setUnit(props.unit);
    }
  }
);

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
