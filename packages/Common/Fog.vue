<script setup lang="ts">
import { inject, onMounted, onUnmounted, watch } from "vue";
import type { Expression } from "mapbox-gl";
import { mapvueSymbol } from "../symbols";

interface Props {
  color?: string | Expression;
  "high-color"?: string | Expression;
  "space-color"?: string | Expression;
  "horizon-blend"?: number | Expression;
  range?: number[] | Expression;
  "star-intensity"?: number | Expression;
}

const map = inject(mapvueSymbol, undefined);
const props = defineProps<Props>();

const renderFog = (options = {}) => {
  if (!map) return;
  map.value.setFog(options);
};

watch(
  () => props.color,
  () => renderFog(props)
);

watch(
  () => props["horizon-blend"],
  () => renderFog(props)
);

watch(
  () => props["high-color"],
  () => renderFog(props)
);

watch(
  () => props["space-color"],
  () => renderFog(props)
);

watch(
  () => props["star-intensity"],
  () => renderFog(props)
);

watch(
  () => props.range,
  () => renderFog(props)
);

onMounted(() => {
  renderFog(props || {});
});

onUnmounted(() => {
  renderFog();
});
</script>

<template></template>
