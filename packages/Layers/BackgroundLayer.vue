<script setup lang="ts">
import { AnyLayer, BackgroundLayout, BackgroundPaint } from "mapbox-gl";
import { inject, onMounted, onUnmounted, shallowRef, watch } from "vue";
import { mapvueSymbol } from "../symbols";

interface Props {
  id: string;
  paint?: BackgroundPaint;
  layout?: BackgroundLayout;
}

const layer = shallowRef<AnyLayer>();
const map = inject(mapvueSymbol);
const props = defineProps<Props>();

const updatePaintProperty = (name: string, value: unknown) => {
  map?.value.setPaintProperty(props.id, name, value);
};

const updateLayoutProperty = (name: string, value: unknown) => {
  map?.value.setLayoutProperty(props.id, name, value);
};

watch(
  () => props.paint as BackgroundPaint,
  (cur: BackgroundPaint, prev: BackgroundPaint) => {
    if (!map) return;
    if (!layer.value) return;
    for (const key in cur) {
      if (!prev[key]) {
        updatePaintProperty(key, cur[key]);
        continue;
      }
      if (cur[key] === prev[key]) continue;
      updatePaintProperty(key, cur[key]);
    }
    for (const key in prev) {
      if (cur[key]) continue;
      updatePaintProperty(key, undefined);
    }
  }
);

watch(
  () => props.layout as BackgroundLayout,
  (cur: BackgroundLayout, prev: BackgroundLayout) => {
    if (!map) return;
    if (!layer.value) return;
    for (const key in cur) {
      if (!prev[key]) {
        updateLayoutProperty(key, cur[key]);
        continue;
      }
      if (cur[key] === prev[key]) continue;
      updateLayoutProperty(key, cur[key]);
    }
    for (const key in prev) {
      if (cur[key]) continue;
      updateLayoutProperty(key, undefined);
    }
  }
);

onMounted(() => {
  if (map) {
    console.log(map.value, props);
    map.value.addLayer({
      type: "background",
      id: props.id,
      paint: props.paint || {},
      layout: props.layout || {},
    });
    layer.value = map.value.getLayer(props.id);
  }
});

onUnmounted(() => {
  if (layer.value) {
    map?.value.removeLayer(props.id);
  }
});
</script>

<template></template>
