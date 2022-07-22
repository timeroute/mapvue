<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref } from "vue";
import { mapvueSymbol } from "../symbols";
import type { AnySourceImpl } from "mapbox-gl";

interface Props {
  id: string;
  url: string;
  tileSize: 256 | 512;
  maxzoom: number;
  exaggeration: number;
}

const source = ref<AnySourceImpl>();
const map = inject(mapvueSymbol);
const props = defineProps<Props>();

onMounted(() => {
  if (map) {
    console.log(map.value, props);
    map.value.addSource(props.id, {
      type: "raster-dem",
      url: props.url,
      tileSize: props.tileSize || 256,
      maxzoom: props.maxzoom || 22,
    });
    source.value = map.value.getSource(props.id);
    map.value.setTerrain({
      source: props.id,
      exaggeration: props.exaggeration || 1,
    });
  }
});

onUnmounted(() => {
  if (source.value) {
    map?.value.setTerrain();
    map?.value.removeSource(props.id);
  }
});
</script>

<template></template>
