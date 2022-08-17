<script setup lang="ts">
import type {
  AnyLayer,
  EventData,
  LineLayer,
  LineLayout,
  LinePaint,
} from "mapbox-gl";
import { inject, onMounted, onBeforeUnmount, shallowRef, watch } from "vue";
import { useLayerEvent } from "../composables";
import { mapvueSymbol } from "../symbols";
import { diffObject } from "../utils";

interface Props {
  id: string;
  source: string;
  sourceLayer?: string;
  paint?: LinePaint;
  layout?: LineLayout;
  minzoom?: number;
  maxzoom?: number;
  filter?: unknown[];
}

const layer = shallowRef<AnyLayer>();
const map = inject(mapvueSymbol, undefined);
const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "click", event: EventData): void;
  (e: "mousemove", event: EventData): void;
  (e: "mouseenter", event: EventData): void;
  (e: "mouseleave", event: EventData): void;
}>();

if (map) {
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
}

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
  () => ({ ...(props.paint as LinePaint) }),
  (cur: LinePaint, prev: LinePaint) => {
    diffObject(cur, prev, updatePaintProperty);
  },
  {
    deep: false,
  }
);

watch(
  () => ({ ...(props.layout as LineLayout) }),
  (cur: LineLayout, prev: LineLayout) => {
    diffObject(cur, prev, updateLayoutProperty);
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
  if (props.sourceLayer) {
    options["source-layer"] = props.sourceLayer;
  }
  map.value.addLayer(options);

  layer.value = map.value.getLayer(props.id);
});

onBeforeUnmount(() => {
  if (map && layer.value) {
    map.value.removeLayer(props.id);
  }
});
</script>

<template></template>
