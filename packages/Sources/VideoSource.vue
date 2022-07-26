<script setup lang="ts">
import { inject, onMounted, onUnmounted, shallowRef, watch } from "vue";
import { mapvueSymbol } from "../symbols";
import type { AnySourceImpl, VideoSource } from "mapbox-gl";

interface Props {
  id: string;
  urls: string[];
  coordinates: number[][];
  playing: boolean;
}

const source = shallowRef<AnySourceImpl>();
const map = inject(mapvueSymbol);
const props = defineProps<Props>();

const updateVideoSource = () => {
  if (!map || !source.value) return;
  (source.value as VideoSource).setCoordinates(props.coordinates);
};

watch(() => props.coordinates, updateVideoSource);

watch(
  () => props.playing,
  () => {
    if (props.playing) {
      (source.value as VideoSource).play();
    } else {
      (source.value as VideoSource).pause();
    }
  }
);

onMounted(() => {
  if (!map) return;
  map.value.addSource(props.id, {
    type: "video",
    urls: props.urls,
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
