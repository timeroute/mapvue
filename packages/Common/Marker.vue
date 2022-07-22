<script setup lang="ts">
import mapboxgl, {
  LngLatLike,
  Marker,
  MarkerOptions,
  PointLike,
} from "mapbox-gl";
import { inject, onMounted, onUnmounted, shallowRef, watch } from "vue";
import { mapvueSymbol } from "../symbols";

interface Props {
  center: LngLatLike;
  options: MarkerOptions;
}

const marker = shallowRef<Marker>();
const map = inject(mapvueSymbol);
const props = defineProps<Props>();

watch(
  () => props.center,
  () => {
    marker.value?.setLngLat(props.center);
  }
);

watch(
  () => props.options?.offset,
  () => {
    marker.value?.setOffset(props.options?.offset as PointLike);
  }
);

watch(
  () => props.options?.draggable,
  () => {
    marker.value?.setDraggable(props.options?.draggable || false);
  }
);

watch(
  () => props.options?.rotation,
  (rotation) => {
    if (rotation) {
      marker.value?.setRotation(rotation);
    }
  }
);

watch(
  () => props.options?.rotationAlignment,
  (rotationAlignment) => {
    if (rotationAlignment) {
      marker.value?.setRotationAlignment(rotationAlignment);
    }
  }
);

watch(
  () => props.options?.pitchAlignment,
  (pitchAlignment) => {
    if (pitchAlignment) {
      marker.value?.setRotationAlignment(pitchAlignment);
    }
  }
);

onMounted(() => {
  if (!map) return;
  marker.value = new mapboxgl.Marker(props.options || {}).addTo(map.value);
});

onUnmounted(() => {
  if (!map || !marker.value) return;
  marker.value.remove();
});
</script>

<template>
  <slot name="popup"></slot>
</template>
