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

const renderFog = () => {
  if (!map) return;
  const options = {};
  Object.keys(props).forEach((key) => {
    if (props[key] !== undefined) {
      options[key] = props[key];
    }
  });
  map.value.setFog(options);
};

watch(
  () => props.color,
  () => renderFog()
);

watch(
  () => props["horizon-blend"],
  () => renderFog()
);

watch(
  () => props["high-color"],
  () => renderFog()
);

watch(
  () => props["space-color"],
  () => renderFog()
);

watch(
  () => props["star-intensity"],
  () => renderFog()
);

watch(
  () => props.range,
  () => renderFog()
);

onMounted(() => {
  renderFog();
});

onUnmounted(() => {
  if (!map) return;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  map.value.setFog();
});
</script>

<template></template>
