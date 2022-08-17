<script setup lang="ts">
import { inject, onMounted, onUnmounted, shallowRef, watch } from "vue";
import { mapvueSymbol } from "../symbols";
import type {
  AnySourceImpl,
  PromoteIdSpecification,
  VectorSource,
  VectorSourceImpl,
} from "mapbox-gl";

interface Props {
  id: string;
  url?: string;
  tiles?: string[];
  promoteId?: PromoteIdSpecification;
  scheme?: "xyz" | "tms";
  attribution?: string;
  bounds?: number[];
  minzoom?: number;
  maxzoom?: number;
  volatile?: boolean;
}

const source = shallowRef<AnySourceImpl>();
const map = inject(mapvueSymbol, undefined);
const props = defineProps<Props>();

watch(
  () => props.url,
  (url) => {
    if (url) {
      (source.value as VectorSourceImpl).setUrl(url);
    }
  }
);

watch(
  () => props.tiles,
  (tiles) => {
    if (tiles && !props.url) {
      (source.value as VectorSourceImpl).setTiles(tiles);
    }
  }
);

onMounted(() => {
  if (!map) return;
  const options: VectorSource = {
    id: props.id,
    type: "vector",
    scheme: props.scheme || "xyz",
    attribution: props.attribution || "",
    bounds: props.bounds || [-180, -85.051129, 180, 85.051129],
    minzoom: props.minzoom || 0,
    maxzoom: props.maxzoom || 22,
    // volatile: props.volatile || false,
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
    source.value = map.value.getSource(props.id);
  }
});

onUnmounted(() => {
  if (!map || !source.value) return;
  map.value.removeSource(props.id);
});
</script>

<template></template>
