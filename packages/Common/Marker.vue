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
const emits = defineEmits<{
  (e: "click"): void;
  (e: "update:center", center: LngLatLike): void;
}>();

const renderMarker = () => {
  if (!map) return;
  if (marker.value) {
    marker.value?.off("dragend", onDragEvent);
    marker.value.remove();
  }
  marker.value = new mapboxgl.Marker(props.options || {}).setLngLat(
    props.center
  );
  marker.value.addTo(map.value);
  marker.value?.getElement().addEventListener("click", onClickEvent);
  marker.value?.on("dragend", onDragEvent);
};

const onClickEvent = () => {
  emits("click");
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

const onDragEvent = (e) => {
  const { lng, lat } = e.target.getLngLat();
  emits("update:center", [lng, lat]);
};

onMounted(() => {
  renderMarker();
});

onUnmounted(() => {
  if (!map) return;
  if (marker.value) {
    marker.value.off("dragend", onDragEvent);
    marker.value.getElement().removeEventListener("click", onClickEvent);
    marker.value.remove();
  }
});
</script>

<template></template>
