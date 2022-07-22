<script setup lang="ts">
import { AnyLayer, CircleLayer, CircleLayout, CirclePaint } from "mapbox-gl";
import { inject, onMounted, onUnmounted, ref, watch } from "vue";
import { mapvueSymbol } from "../symbols";

interface Props {
  id: string;
  source: string;
  paint?: CirclePaint;
  layout?: CircleLayout;
  minzoom?: number;
  maxzoom?: number;
  filter?: unknown[] | undefined;
}

const layer = ref<AnyLayer>();
const map = inject(mapvueSymbol);
const props = defineProps<Props>();

const updatePaintProperty = (name: string, value: unknown) => {
  map?.value.setPaintProperty(props.id, name, value);
};

const updateLayoutProperty = (name: string, value: unknown) => {
  map?.value.setLayoutProperty(props.id, name, value);
};

const updateLayoutZoom = () => {
  if (!map) return;
  if (!layer.value) return;
  map.value.setLayerZoomRange(
    props.id,
    props.minzoom ?? 0,
    props.maxzoom ?? 24
  );
};

watch(
  () => props.paint as CirclePaint,
  (cur: CirclePaint, prev: CirclePaint) => {
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
  () => props.layout as CircleLayout,
  (cur: CircleLayout, prev: CircleLayout) => {
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

watch(() => props.minzoom, updateLayoutZoom);

watch(() => props.maxzoom, updateLayoutZoom);

watch(
  () => props.filter,
  () => {
    if (!map) return;
    map.value.setFilter(props.id, props.filter);
  }
);

onMounted(() => {
  if (map) {
    const options: CircleLayer = {
      type: "circle",
      id: props.id,
      source: props.source,
      paint: props.paint || {},
      layout: props.layout || {},
      minzoom: props.minzoom ?? 0,
      maxzoom: props.maxzoom ?? 24,
    };
    if (props.filter) {
      options.filter = props.filter;
    }
    map.value.addLayer(options);
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
