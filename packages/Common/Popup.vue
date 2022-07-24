<script setup lang="ts">
import mapboxgl, {
  LngLatLike,
  PointLike,
  Popup,
  PopupOptions,
} from "mapbox-gl";
import { inject, onMounted, onUnmounted, ref, shallowRef, watch } from "vue";
import { mapvueSymbol } from "../symbols";

interface Props {
  center: LngLatLike;
  options: PopupOptions;
}

const map = inject(mapvueSymbol);
const props = defineProps<Props>();
const popup = shallowRef<Popup>();
const popupRef = ref();

watch(
  () => props.center,
  () => {
    if (map) popup.value?.setLngLat(props.center);
  }
);

watch(
  () => props.options?.anchor,
  () => {
    if (!map || !popup.value) return;
    popup.value.remove();
    popup.value = new mapboxgl.Popup(props.options || {}).setLngLat(
      props.center
    );
    popup.value.setHTML(popupRef.value?.innerHTML);
    popup.value.addTo(map?.value);
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
  () => popupRef.value,
  () => {
    console.log(popupRef.value);

    if (popup.value && map) {
      popup.value.setHTML(popupRef.value.innerHTML).addTo(map.value);
    }
  },
  {
    deep: true,
    immediate: true,
  }
);

onMounted(() => {
  if (!map) return;
  popup.value = new mapboxgl.Popup(props.options || {})
    .setLngLat(props.center)
    .addTo(map.value);
});

onUnmounted(() => {
  if (!map || !popup.value) return;
  popup.value.remove();
});
</script>

<template>
  <div class="popup" ref="popupRef">
    <slot name="popup"></slot>
  </div>
</template>

<style scoped>
.popup {
  display: none;
}
</style>
