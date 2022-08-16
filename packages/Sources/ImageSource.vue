<script setup lang="ts">
import { inject, onMounted, onUnmounted, shallowRef, watch } from "vue";
import { mapvueSymbol } from "../symbols";
import type { AnySourceImpl, ImageSource } from "mapbox-gl";

interface Props {
  id: string;
  url: string;
  coordinates: number[][];
}

const source = shallowRef<AnySourceImpl>();
const map = inject(mapvueSymbol, undefined);
const props = defineProps<Props>();

const updateImageSource = () => {
  if (!source.value) return;
  (source.value as ImageSource).updateImage({
    url: props.url,
    coordinates: props.coordinates,
  });
};

watch(() => props.url, updateImageSource);

watch(() => props.coordinates, updateImageSource);

onMounted(() => {
  if (!map) return;
  map.value.addSource(props.id, {
    type: "image",
    url: props.url,
    coordinates: props.coordinates,
  });
  source.value = map.value.getSource(props.id);
});

onUnmounted(() => {
  if (!map || !source.value) return;
  map.value.removeSource(props.id);
});
</script>

<template></template>
