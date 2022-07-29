<script setup lang="ts">
import type { AnyLayer, BackgroundLayout, BackgroundPaint } from "mapbox-gl";
import { inject, onMounted, onBeforeUnmount, shallowRef, watch } from "vue";
import { mapvueSymbol } from "../symbols";

interface Props {
  id: string;
  sourceLayer?: string;
  paint?: BackgroundPaint;
  layout?: BackgroundLayout;
}

const layer = shallowRef<AnyLayer>();
const map = inject(mapvueSymbol);
const props = defineProps<Props>();

const updatePaintProperty = (name: string, value: unknown) => {
  if (!map) return;
  map.value.setPaintProperty(props.id, name, value);
};

const updateLayoutProperty = (name: string, value: unknown) => {
  if (!map) return;
  map.value.setLayoutProperty(props.id, name, value);
};

watch(
  () => ({ ...(props.paint as BackgroundPaint) }),
  (cur: BackgroundPaint, prev: BackgroundPaint) => {
    if (!map || !layer.value) return;
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
  },
  {
    deep: false,
  }
);

watch(
  () => ({ ...(props.layout as BackgroundLayout) }),
  (cur: BackgroundLayout, prev: BackgroundLayout) => {
    if (!map || !layer.value) return;
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
  },
  {
    deep: false,
  }
);

onMounted(() => {
  if (!map) return;
  map.value.addLayer(
    {
      id: props.id,
      type: "background",
      paint: props.paint || {},
      layout: props.layout || {},
    },
    props.sourceLayer
  );
  layer.value = map.value.getLayer(props.id);
});

onBeforeUnmount(() => {
  if (!map || !layer.value) return;
  map.value.removeLayer(props.id);
});
</script>

<template></template>
