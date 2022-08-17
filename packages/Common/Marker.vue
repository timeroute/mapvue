<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import type { LngLatLike, Marker, MarkerOptions, PointLike } from "mapbox-gl";
import {
  computed,
  inject,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
  watch,
} from "vue";
import { mapvueSymbol } from "../symbols";
import { useMutationObserver, useEventListener } from "../composables";

interface Props {
  center?: LngLatLike;
  options?: MarkerOptions;
}

const marker = shallowRef<Marker>();
const map = inject(mapvueSymbol, undefined);
const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "click", event: Event): void;
  (e: "mouseenter", event: Event): void;
  (e: "mousemove", event: Event): void;
  (e: "mouseleave", event: Event): void;
  (e: "update:center", center: LngLatLike): void;
}>();
const elRef = ref();

const renderMarker = () => {
  if (!map || !props.center) return;

  const options = props.options || {};
  if (elRef.value.innerHTML) options.element = elRef.value;

  marker.value = new mapboxgl.Marker(options).setLngLat(props.center);
  marker.value.addTo(map.value);
  marker.value.on("dragend", onDragEvent);
};

const destroyMarker = () => {
  if (!map || !marker.value) return;
  marker.value.off("dragend", onDragEvent);
  marker.value.remove();
  marker.value = undefined;
};

const onDragEvent = () => {
  if (!marker.value) return;
  const { lng, lat } = marker.value.getLngLat();
  emits("update:center", [lng, lat]);
};

useMutationObserver(
  elRef.value,
  {
    attributes: true,
    childList: true,
    subtree: true,
  },
  () => {
    renderMarker();
  }
);

useEventListener(
  computed(() => marker.value?.getElement()),
  "click",
  (e) => {
    emits("click", e);
  }
);

useEventListener(
  computed(() => marker.value?.getElement()),
  "mouseenter",
  (e) => {
    emits("mouseenter", e);
  }
);

useEventListener(
  computed(() => marker.value?.getElement()),
  "mousemove",
  (e) => {
    emits("mousemove", e);
  }
);

useEventListener(
  computed(() => marker.value?.getElement()),
  "mouseleave",
  (e) => {
    emits("mouseleave", e);
  }
);

watch(
  () => props.center,
  () => {
    if (props.center) {
      if (marker.value) {
        marker.value.setLngLat(props.center);
      } else {
        renderMarker();
      }
    } else {
      destroyMarker();
    }
  }
);

watch(
  () => props.options?.offset,
  (offset) => {
    if (!marker.value || !offset) return;
    marker.value.setOffset(offset as PointLike);
  }
);

watch(
  () => props.options?.draggable,
  (draggable) => {
    if (!marker.value || draggable === undefined) return;
    marker.value.setDraggable(draggable);
  }
);

watch(
  () => props.options?.scale,
  () => {
    if (!marker.value) return;
    destroyMarker();
    renderMarker();
  }
);

watch(
  () => props.options?.rotation,
  (rotation) => {
    if (!marker.value || rotation === undefined) return;
    marker.value.setRotation(rotation);
  }
);

watch(
  () => props.options?.color,
  () => {
    if (!marker.value) return;
    destroyMarker();
    renderMarker();
  }
);

watch(
  () => props.options?.anchor,
  () => {
    if (!marker.value) return;
    destroyMarker();
    renderMarker();
  }
);

watch(
  () => props.options?.rotationAlignment,
  (rotationAlignment) => {
    if (!marker.value || !rotationAlignment) return;
    marker.value.setRotationAlignment(rotationAlignment);
  }
);

watch(
  () => props.options?.pitchAlignment,
  (pitchAlignment) => {
    if (pitchAlignment) {
      marker.value?.setPitchAlignment(pitchAlignment);
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

<template>
  <div ref="elRef">
    <slot />
  </div>
</template>
