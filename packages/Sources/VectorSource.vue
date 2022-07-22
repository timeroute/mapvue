<script setup lang="ts">
import { inject, onMounted, onUnmounted, shallowRef, watch } from "vue";
import { mapvueSymbol } from "../symbols";
import type {
  AnySourceImpl,
  PromoteIdSpecification,
  VectorSource,
} from "mapbox-gl";

interface Props {
  id: string;
  url?: string;
  tiles?: string[];
  tileSize?: 256 | 512;
  promoteId?: PromoteIdSpecification | undefined;
  scheme?: "xyz" | "tms";
  attribution?: string;
  bounds?: number[];
  minzoom?: number;
  maxzoom?: number;
}

const source = shallowRef<AnySourceImpl>();
const map = inject(mapvueSymbol);
const props = defineProps<Props>();

watch(
  () => props.url,
  (url) => {
    if (url) {
      // update tiles
      source.value as VectorSource;
    }
  }
);

watch(
  () => props.tiles,
  (tiles) => {
    if (tiles && !props.url) {
      // update tiles
      source.value as VectorSource;
    }
  }
);

onMounted(() => {
  if (map) {
    console.log(map.value, props);
    const options: VectorSource = {
      id: props.id,
      type: "raster",
      scheme: props.scheme || "xyz",
      tileSize: props.tileSize || 256,
      attribution: props.attribution || "",
      bounds: props.bounds || [-180, -85.051129, 180, 85.051129],
      minzoom: props.minzoom || 0,
      maxzoom: props.maxzoom || 22,
    };
    if (props.promoteId) {
      options.promoteId = props.promoteId;
    }
    if (props.tiles) {
      options.tiles = props.tiles;
    }
    if (props.url) {
      delete options.tiles;
      options.url = props.url;
    }
    if (options.url || options.tiles) {
      map.value.addSource(props.id, options);
    }
    source.value = map.value.getSource(props.id);
  }
});

onUnmounted(() => {
  if (source.value) {
    map?.value.removeSource(props.id);
  }
});
</script>

<template></template>
