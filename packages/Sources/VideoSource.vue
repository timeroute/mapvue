<script setup lang="ts">
import { inject, onMounted, onUnmounted, shallowRef, watch } from "vue";
import { mapvueSymbol } from "../symbols";
import type { AnySourceImpl, VideoSource } from "mapbox-gl";

interface Props {
  id: string;
  urls: string[];
  coordinates: number[][];
}

const source = shallowRef<AnySourceImpl>();
const map = inject(mapvueSymbol);
const props = defineProps<Props>();

const updateVideoSource = () => {
  if (source.value) {
    (source.value as VideoSource).setCoordinates(props.coordinates);
  }
};

watch(() => props.coordinates, updateVideoSource);

onMounted(() => {
  if (map) {
    map.value.addSource(props.id, {
      type: "video",
      urls: props.urls,
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
