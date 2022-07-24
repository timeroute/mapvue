<script setup lang="ts">
import {
  AnyLayer,
  EventData,
  LineLayer,
  LineLayout,
  LinePaint,
} from "mapbox-gl";
import { inject, onMounted, onUnmounted, shallowRef, watch } from "vue";
import { mapvueSymbol } from "../symbols";

interface Props {
  id: string;
  source: string;
  paint?: LinePaint;
  layout?: LineLayout;
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
  (e: "mouseover", event: EventData): void;
  (e: "mouseleave", event: EventData): void;
}>();

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
  () => props.paint as LinePaint,
  (cur: LinePaint, prev: LinePaint) => {
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
  () => props.layout as LineLayout,
  (cur: LineLayout, prev: LineLayout) => {
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

const onClickEvent = (e: EventData) => {
  emits("click", e);
};

const onMouseEnterEvent = (e: EventData) => {
  emits("mouseenter", e);
};

const onMouseMoveEvent = (e: EventData) => {
  emits("mousemove", e);
};

const onMouseLeaveEvent = (e: EventData) => {
  emits("mouseleave", e);
};

onMounted(() => {
  if (map) {
    const options: LineLayer = {
      type: "line",
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
    map.value.on("click", props.id, onClickEvent);
    map.value.on("mouseenter", props.id, onMouseEnterEvent);
    map.value.on("mousemove", props.id, onMouseMoveEvent);
    map.value.on("mouseleave", props.id, onMouseLeaveEvent);
  }
});

onUnmounted(() => {
  if (map && layer.value) {
    map.value.off("click", props.id, onClickEvent);
    map.value.off("mouseenter", props.id, onMouseEnterEvent);
    map.value.off("mousemove", props.id, onMouseMoveEvent);
    map.value.off("mouseleave", props.id, onMouseLeaveEvent);
    map.value.removeLayer(props.id);
  }
});
</script>

<template></template>
