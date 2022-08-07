<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import type { LngLatLike, Marker, MarkerOptions, PointLike } from "mapbox-gl";
import { inject, onMounted, onUnmounted, ref, shallowRef, watch } from "vue";
import { mapvueSymbol } from "../symbols";
import { useMutationObserver } from "../composables/mutation_observer";

interface Props {
  center?: LngLatLike | undefined;
  options?: MarkerOptions;
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
const elRef = ref();

const renderMarker = () => {
  if (!map || !props.center) return;

  const options = props.options || {};
  if (elRef.value.innerHTML) options.element = elRef.value;

  marker.value = new mapboxgl.Marker(options).setLngLat(props.center);
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
  marker.value = undefined;
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
      marker.value?.setRotationAlignment(pitchAlignment);
    }
  }
);

onMounted(() => {
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
