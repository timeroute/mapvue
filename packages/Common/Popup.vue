<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import type { LngLatLike, PointLike, Popup, PopupOptions } from "mapbox-gl";
import { inject, onMounted, onUnmounted, ref, shallowRef, watch } from "vue";
import { mapvueSymbol } from "../symbols";

interface Props {
  visible: boolean;
  center?: LngLatLike | undefined;
  options?: PopupOptions;
}

const map = inject(mapvueSymbol);
const props = defineProps<Props>();
const popup = shallowRef<Popup>();
const observer = shallowRef<MutationObserver>();
const emits = defineEmits<{
  (e: "update:visible", visible: boolean): void;
}>();
const popupRef = ref();

const callback = function () {
  if (props.visible && popup.value) {
    popup.value.setHTML(popupRef.value.innerHTML);
  }
};

const renderPopup = () => {
  if (!map) return;
  if (!props.center) return;
  if (!props.visible) return;
  popup.value = new mapboxgl.Popup(props.options || {})
    .setLngLat(props.center)
    .setHTML(popupRef.value.innerHTML)
    .addTo(map.value);
  observer.value = new MutationObserver(callback);
  observer.value.observe(popupRef.value, {
    attributes: true,
    childList: true,
    subtree: true,
  });
  popup.value.on("close", onCloseEvent);
};

const destroyPopup = () => {
  if (popup.value) {
    if (observer.value) observer.value.disconnect();
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
    if (!popup.value || !props.visible) return;
    if (props.center) {
      popup.value.setLngLat(props.center);
    } else {
      destroyPopup();
    }
  }
);

watch(
  () => props.options?.anchor,
  () => {
    if (!popup.value || !props.visible) return;
    destroyPopup();
    renderPopup();
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
  <div class="popup" ref="popupRef">
    <slot />
  </div>
</template>

<style scoped>
.popup {
  display: none;
}
</style>
