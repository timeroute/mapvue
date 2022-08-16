<script setup lang="ts">
import type { AnyLayer, BackgroundLayout, BackgroundPaint } from "mapbox-gl";
import { inject, onMounted, onBeforeUnmount, shallowRef, watch } from "vue";
import { mapvueSymbol } from "../symbols";
import { diffObject } from "../utils";

interface Props {
  id: string;
  sourceLayer?: string;
  paint?: BackgroundPaint;
  layout?: BackgroundLayout;
}

const layer = shallowRef<AnyLayer>();
const map = inject(mapvueSymbol, undefined);
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
    diffObject(cur, prev, updatePaintProperty);
  },
  {
    deep: false,
  }
);

watch(
  () => ({ ...(props.layout as BackgroundLayout) }),
  (cur: BackgroundLayout, prev: BackgroundLayout) => {
    diffObject(cur, prev, updateLayoutProperty);
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
