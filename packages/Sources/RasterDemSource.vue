<script setup lang="ts">
import { inject, onMounted, onUnmounted, shallowRef } from "vue";
import { mapvueSymbol } from "../symbols";
import type { AnySourceImpl, RasterDemSource } from "mapbox-gl";

interface Props {
  id: string;
  url?: string;
  tiles?: string[];
  tileSize?: 256 | 512;
  attribution?: string;
  bounds?: number[];
  minzoom?: number;
  maxzoom?: number;
  exaggeration?: number;
  encoding?: string;
  volatile?: boolean;
}

const source = shallowRef<AnySourceImpl>();
const map = inject(mapvueSymbol, undefined);
const props = defineProps<Props>();

onMounted(() => {
  if (!map) return;
  const options: RasterDemSource = {
    id: props.id,
    type: "raster-dem",
    tileSize: props.tileSize || 256,
    attribution: props.attribution || "",
    bounds: props.bounds || [-180, -85.051129, 180, 85.051129],
    minzoom: props.minzoom || 0,
    maxzoom: props.maxzoom || 22,
    // volatile: props.volatile || false,
  };
  if (props.tiles) {
    options.tiles = props.tiles;
  }
  if (props.url) {
    delete options.tiles;
    options.url = props.url;
  }
  if (options.url || options.tiles) {
    map.value.addSource(props.id, options);
    source.value = map.value.getSource(props.id);
    map.value.setTerrain({
      source: props.id,
      exaggeration: props.exaggeration || 1,
    });
  }
});

onUnmounted(() => {
  if (!map || !source.value) return;
  map.value.setTerrain();
  map.value.removeSource(props.id);
});
</script>

<template></template>
