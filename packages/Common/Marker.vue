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

const marker = shallowRef<Marker>();
const map = inject(mapvueSymbol, undefined);
const props = defineProps<{
  center?: LngLatLike;
  options?: MarkerOptions;
}>();
const emits = defineEmits<{
  (e: "click", event: Event): void;
  (e: "mouseenter", event: Event): void;
  (e: "mousemove", event: Event): void;
  (e: "mouseleave", event: Event): void;
  (e: "update:center", center: LngLatLike): void;
}>();
const elRef = ref();


function renderMarker() {
  if (!map || !props.center) return;
  destroyMarker();
  const options = { ...props.options };
  if (elRef.value && elRef.value.innerHTML) options.element = elRef.value;
  marker.value = new mapboxgl.Marker(options).setLngLat(props.center);
  marker.value.addTo(map.value);
  marker.value.on("dragend", onDragEvent);
}

function destroyMarker() {
  if (!marker.value) return;
  marker.value.off("dragend", onDragEvent);
  marker.value.remove();
  marker.value = undefined;
}

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


// 合并 watch，减少重复销毁/重建
watch(
  () => [props.center, props.options],
  ([center, options], [oldCenter, oldOptions]) => {
    // center 变化
    if (!center) {
      destroyMarker();
      return;
    }
    // 需重建 marker 的属性
    const rebuildKeys = ["scale", "color", "anchor"];
    let needRebuild = false;
    // 只在 options 是对象时才访问属性
    const isMarkerOptions = (obj: unknown): obj is MarkerOptions => obj && typeof obj === 'object' && !Array.isArray(obj);
    if (!marker.value) {
      needRebuild = true;
    } else if (isMarkerOptions(options) && isMarkerOptions(oldOptions)) {
      for (const key of rebuildKeys) {
        if (options[key as keyof MarkerOptions] !== oldOptions[key as keyof MarkerOptions]) {
          needRebuild = true;
          break;
        }
      }
    }
    if (needRebuild) {
      renderMarker();
      return;
    }
    // 仅 center 变化
    if (marker.value && center) {
      marker.value.setLngLat(center as LngLatLike);
    }
    // 其他属性
    if (isMarkerOptions(options) && isMarkerOptions(oldOptions)) {
      if (options.offset !== oldOptions.offset && options.offset) {
        marker.value.setOffset(options.offset as PointLike);
      }
      if (options.draggable !== oldOptions.draggable && options.draggable !== undefined) {
        marker.value.setDraggable(options.draggable);
      }
      if (options.rotation !== oldOptions.rotation && options.rotation !== undefined) {
        marker.value.setRotation(options.rotation);
      }
      if (options.rotationAlignment !== oldOptions.rotationAlignment && options.rotationAlignment) {
        marker.value.setRotationAlignment(options.rotationAlignment);
      }
      if (options.pitchAlignment !== oldOptions.pitchAlignment && options.pitchAlignment) {
        marker.value.setPitchAlignment(options.pitchAlignment);
      }
    }
  },
  { deep: true }
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
