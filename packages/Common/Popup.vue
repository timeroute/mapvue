<script setup lang="ts">
import mapboxgl, {
  LngLatLike,
  PointLike,
  Popup,
  PopupOptions,
} from "mapbox-gl";
import { inject, onMounted, onUnmounted, shallowRef, watch } from "vue";
import { mapvueSymbol } from "../symbols";

interface Props {
  center: LngLatLike;
  options: PopupOptions;
}

const popup = shallowRef<Popup>();
const map = inject(mapvueSymbol);
const props = defineProps<Props>();

watch(
  () => props.center,
  () => {
    popup.value?.setLngLat(props.center);
  }
);

watch(
  () => props.options?.offset,
  () => {
    popup.value?.setOffset(props.options?.offset as PointLike);
  }
);

watch(
  () => props.options?.maxWidth,
  (maxWidth) => {
    if (maxWidth) {
      popup.value?.setMaxWidth(maxWidth);
    }
  }
);

onMounted(() => {
  if (!map) return;
  popup.value = new mapboxgl.Popup(props.options || {}).addTo(map.value);
});

onUnmounted(() => {
  if (!map || !popup.value) return;
  popup.value.remove();
});
</script>

<template>
  <slot></slot>
</template>
