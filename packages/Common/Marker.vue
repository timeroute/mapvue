<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import type { LngLatLike, Marker, MarkerOptions, PointLike } from "mapbox-gl";
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
  (e: "click", event: Event): void;
  (e: "mouseenter", event: Event): void;
  (e: "mousemove", event: Event): void;
  (e: "mouseleave", event: Event): void;
  (e: "update:center", center: LngLatLike): void;
}>();

const renderMarker = () => {
  if (!map) return;
  destroyMarker();
  marker.value = new mapboxgl.Marker(props.options || {}).setLngLat(
    props.center
  );
  const el = marker.value.getElement();
  marker.value.addTo(map.value);
  marker.value.on("dragend", onDragEvent);
  el.addEventListener("click", onClickEvent);
  el.addEventListener("mouseenter", onMouseEnterEvent);
  el.addEventListener("mousemove", onMouseMoveEvent);
  el.addEventListener("mouseleave", onMouseLeaveEvent);
};

const destroyMarker = () => {
  if (!map || !marker.value) return;
  const el = marker.value.getElement();
  marker.value.off("dragend", onDragEvent);
  el.removeEventListener("click", onClickEvent);
  el.removeEventListener("mouseenter", onMouseEnterEvent);
  el.removeEventListener("mousemove", onMouseMoveEvent);
  el.removeEventListener("mouseleave", onMouseLeaveEvent);
  marker.value.remove();
};

const onClickEvent = (e: Event) => {
  e.stopPropagation();
  emits("click", e);
};

const onMouseEnterEvent = (e: Event) => {
  emits("mouseenter", e);
};

const onMouseMoveEvent = (e: Event) => {
  emits("mousemove", e);
};

const onMouseLeaveEvent = (e: Event) => {
  emits("mouseleave", e);
};

const onDragEvent = () => {
  if (!marker.value) return;
  const { lng, lat } = marker.value.getLngLat();
  emits("update:center", [lng, lat]);
};

watch(
  () => props.center,
  () => {
    if (!marker.value) return;
    marker.value.setLngLat(props.center);
  }
);

watch(
  () => props.options?.offset,
  () => {
    if (!marker.value) return;
    marker.value.setOffset(props.options?.offset as PointLike);
  }
);

watch(
  () => props.options?.draggable,
  () => {
    if (!marker.value) return;
    marker.value.setDraggable(props.options?.draggable || false);
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
  destroyMarker();
});
</script>

<template></template>
