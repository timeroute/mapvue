<script setup lang="ts">
import mapboxgl, {
  LngLatLike,
  PointLike,
  Popup,
  PopupOptions,
} from "mapbox-gl";
import { renderToString } from "vue/server-renderer";
import {
  useSlots,
  inject,
  onMounted,
  onUnmounted,
  shallowRef,
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
const popup = shallowRef<Popup>();

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
  () => renderToString(slots.popup()[0]),
  async (dom) => {
    const html = await dom;
    console.log(html, popup.value, map);
    if (map) {
      if (popup.value) {
        popup.value.setHTML(html).addTo(map.value);
      } else {
        popup.value = new mapboxgl.Popup(props.options || {})
          .setLngLat(props.center)
          .setHTML(html)
          .addTo(map.value);
      }
    }
  },
  {
    immediate: true,
  }
);

onMounted(() => {
  if (!map) return;
  popup.value = new mapboxgl.Popup(props.options || {}).setLngLat(props.center);
  popup.value.setText("sdfsdf").addTo(map.value);
});

onUnmounted(() => {
  if (!map || !popup.value) return;
  popup.value.remove();
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
