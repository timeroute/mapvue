<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import type { LngLatLike, PointLike, Popup, PopupOptions } from "mapbox-gl";
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
import { useMutationObserver } from "../composables";

interface Props {
  visible: boolean;
  center?: LngLatLike;
  options?: PopupOptions;
}

const map = inject(mapvueSymbol, undefined);
const props = defineProps<Props>();
const popup = shallowRef<Popup>();
const emits = defineEmits<{
  (e: "update:visible", visible: boolean): void;
}>();
const popupRef = ref<HTMLElement>();

useMutationObserver(
  computed(() => popupRef.value),
  {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true,
  },
  () => {
    if (props.visible && popup.value && popupRef.value) {
      popup.value.setHTML(popupRef.value.innerHTML);
    }
  }
);

const renderPopup = () => {
  if (!map) return;
  if (!props.center) return;
  if (!props.visible) return;
  if (!popupRef.value) return;
  popup.value = new mapboxgl.Popup(props.options || {})
    .setLngLat(props.center)
    .setHTML(popupRef.value.innerHTML)
    .addTo(map.value);
  popup.value.on("close", onCloseEvent);
};

const destroyPopup = () => {
  if (popup.value) {
    popup.value.off("close", onCloseEvent);
    popup.value.remove();
  }
};

watch(
  () => props.visible,
  () => {
    destroyPopup();
    if (props.visible) {
      renderPopup();
    }
  }
);

watch(
  () => props.center,
  () => {
    if (!map) return;
    if (!popup.value || !props.visible) return;
    if (props.center) {
      popup.value.setLngLat(props.center).addTo(map.value);
    } else {
      destroyPopup();
    }
  }
);

watch(
  () => props.options?.anchor,
  (anchor) => {
    if (!popup.value || !props.visible) return;
    if (anchor) {
      destroyPopup();
      renderPopup();
    }
  }
);

watch(
  () => props.options?.offset,
  (offset) => {
    if (!popup.value || !props.visible) return;
    if (offset) {
      popup.value.setOffset(offset as PointLike);
    }
  }
);

watch(
  () => props.options?.maxWidth,
  (maxWidth) => {
    if (!popup.value || !props.visible) return;
    if (maxWidth) {
      popup.value.setMaxWidth(maxWidth);
    }
  }
);

const onCloseEvent = () => {
  emits("update:visible", false);
};

onMounted(() => {
  renderPopup();
});

onUnmounted(() => {
  destroyPopup();
});
</script>

<template>
  <div style="display: none" ref="popupRef">
    <slot />
  </div>
</template>
