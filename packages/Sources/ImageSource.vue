<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref, watch } from "vue";
import { mapvueSymbol } from "../symbols";
import type { AnySourceImpl, ImageSource } from "mapbox-gl";

interface Props {
  id: string;
  url: string;
  coordinates: number[][];
}

const source = ref<AnySourceImpl>();
const map = inject(mapvueSymbol);
const props = defineProps<Props>();

const updateImageSource = () => {
  if (source.value) {
    (source.value as ImageSource).updateImage({
      url: props.url,
      coordinates: props.coordinates,
    });
  }
};

watch(() => props.url, updateImageSource);

watch(() => props.coordinates, updateImageSource);

onMounted(() => {
  if (map) {
    map.value.addSource(props.id, {
      type: "image",
      url: props.url,
      coordinates: props.coordinates,
    });
    source.value = map.value.getSource(props.id);
  }
});

onUnmounted(() => {
  if (map && source.value) {
    map.value.removeSource(props.id);
  }
});
</script>

<template></template>
