<script setup lang="ts">
import type {
  AnyLayer,
  EventData,
  HeatmapLayer,
  HeatmapLayout,
  HeatmapPaint,
} from "mapbox-gl";
import { inject, onMounted, onBeforeUnmount, shallowRef, watch } from "vue";
import { useLayerEvent } from "../composables/layer_event";
import { mapvueSymbol } from "../symbols";

interface Props {
  id: string;
  source: string;
  sourceLayer?: string;
  paint?: HeatmapPaint;
  layout?: HeatmapLayout;
  minzoom?: number;
  maxzoom?: number;
  filter?: unknown[] | undefined;
}

const layer = shallowRef<AnyLayer>();
const map = inject(mapvueSymbol);
const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "click", event: EventData): void;
  (e: "mousemove", event: EventData): void;
  (e: "mouseenter", event: EventData): void;
  (e: "mouseleave", event: EventData): void;
}>();

useLayerEvent(map.value, "click", props.id, (e) => {
  emits("click", e);
});
useLayerEvent(map.value, "mouseenter", props.id, (e) => {
  emits("mouseenter", e);
});
useLayerEvent(map.value, "mousemove", props.id, (e) => {
  emits("mousemove", e);
});
useLayerEvent(map.value, "mouseleave", props.id, (e) => {
  emits("mouseleave", e);
});

const updatePaintProperty = (name: string, value: unknown) => {
  if (!map || !layer.value) return;
  map.value.setPaintProperty(props.id, name, value);
};

const updateLayoutProperty = (name: string, value: unknown) => {
  if (!map || !layer.value) return;
  map.value.setLayoutProperty(props.id, name, value);
};

const updateLayoutZoom = () => {
  if (!map || !layer.value) return;
  map.value.setLayerZoomRange(
    props.id,
    props.minzoom ?? 0,
    props.maxzoom ?? 24
  );
};

watch(
  () => ({ ...(props.paint as HeatmapPaint) }),
  (cur: HeatmapPaint, prev: HeatmapPaint) => {
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
  () => ({ ...(props.layout as HeatmapLayout) }),
  (cur: HeatmapLayout, prev: HeatmapLayout) => {
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

watch(() => props.minzoom, updateLayoutZoom);

watch(() => props.maxzoom, updateLayoutZoom);

watch(
  () => props.filter,
  () => {
    if (!map || !layer.value) return;
    map.value.setFilter(props.id, props.filter);
  }
);

onMounted(() => {
  if (!map) return;
  const options: HeatmapLayer = {
    type: "heatmap",
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
  if (props.sourceLayer) {
    options["source-layer"] = props.sourceLayer;
  }
  map.value.addLayer(options);
  layer.value = map.value.getLayer(props.id);
});

onBeforeUnmount(() => {
  if (!map || !layer.value) return;
  map.value.removeLayer(props.id);
});
</script>

<template></template>
