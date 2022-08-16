<script setup lang="ts">
import { inject, onMounted, onUnmounted, shallowRef, watch } from "vue";
import { mapvueSymbol } from "../symbols";
import type { AnySourceImpl, RasterSource } from "mapbox-gl";

interface Props {
  id: string;
  url?: string;
  tiles?: string[];
  tileSize?: 256 | 512;
  scheme?: "xyz" | "tms";
  attribution?: string;
  bounds?: number[];
  minzoom?: number;
  maxzoom?: number;
  // volatile?: boolean;
}

const source = shallowRef<AnySourceImpl>();
const map = inject(mapvueSymbol, undefined);
const props = defineProps<Props>();

const triggerRepaint = () => {
  if (!map) return;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  map.value.style._sourceCaches[`other:${props.id}`].clearTiles();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  map.value.style._sourceCaches[`other:${props.id}`].update(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    map.value.transform
  );
  map.value.triggerRepaint();
};

watch(
  () => props.url,
  (url) => {
    if (!url || !source.value) return;
    (source.value as RasterSource).url = url;
    triggerRepaint();
  }
);

watch(
  () => props.tiles,
  (tiles) => {
    if (props.url) return;
    if (!tiles || !source.value) return;
    (source.value as RasterSource).tiles = tiles;
    triggerRepaint();
  }
);

onMounted(() => {
  if (!map) return;
  const options: RasterSource = {
    id: props.id,
    type: "raster",
    scheme: props.scheme || "xyz",
    tileSize: props.tileSize || 256,
    attribution: props.attribution || "",
    bounds: props.bounds || [-180, -85.051129, 180, 85.051129],
    minzoom: props.minzoom || 0,
    maxzoom: props.maxzoom || 22,
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
  }
});

onUnmounted(() => {
  if (!map || !source.value) return;
  map.value.removeSource(props.id);
});
</script>

<template></template>
