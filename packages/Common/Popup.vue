<script setup lang="ts">
import mapboxgl, {
  LngLatLike,
  PointLike,
  Popup,
  PopupOptions,
} from "mapbox-gl";
import {
  inject,
  onMounted,
  onUnmounted,
  ref,
  render,
  shallowRef,
  useSlots,
  watch,
} from "vue";
import { mapvueSymbol } from "../symbols";

interface Props {
  center: LngLatLike;
  options: PopupOptions;
}

const slots = useSlots();
const map = inject(mapvueSymbol);
const props = defineProps<Props>();
const popup = shallowRef<Popup>(new mapboxgl.Popup(props.options || {}));
const popupRef = ref();

defineExpose({
  popup,
});

watch(
  () => props.center,
  () => {
    if (map) popup.value?.setLngLat(props.center);
  }
);

watch(
  () => props.options?.offset,
  () => {
    if (!map) return;
    popup.value
      ?.setOffset(props.options?.offset as PointLike)
      .addTo(map?.value);
  }
);

watch(
  () => props.options?.maxWidth,
  (maxWidth) => {
    if (maxWidth && map) {
      popup.value?.setMaxWidth(maxWidth).addTo(map.value);
    }
  }
);

watch(
  () => slots?.popup(),
  (node) => {
    if (node) {
      render(node[0], popupRef.value);
      popup.value.setDOMContent(popupRef.value).addTo(map?.value);
    }
  }
);

onMounted(() => {
  if (!map) return;
  popup.value.addTo(map.value);
});

onUnmounted(() => {
  if (!map || !popup.value) return;
  popup.value.remove();
});
</script>

<template>
  <div class="popup">
    <div ref="popupRef" />
    <slot name="popup"></slot>
  </div>
</template>

<style scoped>
.popup {
  display: none;
}
</style>
