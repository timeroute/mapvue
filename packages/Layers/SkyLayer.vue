<script setup lang="ts">
/**
 * Warning
 *
 * As of v2.9.0, fog is the preferred method for atmospheric styling.
 * Sky layer is not supported by the globe projection, and will be
 * phased out in a future release.
 */
import type { AnyLayer, SkyLayout, SkyPaint } from "mapbox-gl";
import { inject, onMounted, onBeforeUnmount, shallowRef, watch } from "vue";
import { mapvueSymbol } from "../symbols";
import { diffObject } from "../utils";

interface Props {
  id: string;
  paint?: SkyPaint;
  layout?: SkyLayout;
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
  () => ({ ...(props.paint as SkyPaint) }),
  (cur: SkyPaint, prev: SkyPaint) => {
    diffObject(cur, prev, updatePaintProperty);
  },
  {
    deep: false,
  }
);

watch(
  () => ({ ...(props.layout as SkyLayout) }),
  (cur: SkyLayout, prev: SkyLayout) => {
    diffObject(cur, prev, updateLayoutProperty);
  },
  {
    deep: false,
  }
);

onMounted(() => {
  if (!map) return;
  map.value.addLayer({
    id: props.id,
    type: "sky",
    paint: props.paint || {},
    layout: props.layout || {},
  });
  layer.value = map.value.getLayer(props.id);
});

onBeforeUnmount(() => {
  if (!map || !layer.value) return;
  map.value.removeLayer(props.id);
});
</script>

<template></template>
