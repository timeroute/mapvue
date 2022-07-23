<script setup lang="ts">
import mapboxgl, {
  LngLatLike,
  Marker,
  MarkerOptions,
  PointLike,
} from "mapbox-gl";
import {
  inject,
  onMounted,
  onUnmounted,
  shallowRef,
  useSlots,
  watch,
} from "vue";
import { mapvueSymbol } from "../symbols";

interface Props {
  center: LngLatLike;
  options: MarkerOptions;
}

const slots = useSlots();
const marker = shallowRef<Marker>();
const map = inject(mapvueSymbol);
const props = defineProps<Props>();

const renderMarker = () => {
  if (!map) return;
  if (marker.value) {
    marker.value.remove();
  }
  marker.value = new mapboxgl.Marker(props.options || {}).setLngLat(
    props.center
  );
  const popupEl = slots?.popup()?.[0];
  console.log(popupEl);

  if (popupEl) {
    marker.value.setPopup(new mapboxgl.Popup().setHTML(popupEl));
  }
  marker.value.addTo(map.value);
};

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
  () => props.options?.scale,
  () => {
    renderMarker();
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
  () => props.options?.color,
  () => {
    renderMarker();
  }
);

watch(
  () => props.options?.anchor,
  () => {
    renderMarker();
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
  renderMarker();
});

onUnmounted(() => {
  if (!map || !marker.value) return;
  marker.value.remove();
});
</script>

<template>
  <div class="popup">
    <slot name="popup"></slot>
  </div>
</template>

<style scoped>
.popup {
  display: none;
}
</style>
