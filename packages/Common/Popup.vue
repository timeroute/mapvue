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
  visible: boolean;
  center: LngLatLike;
  options: PopupOptions;
}

const slots = useSlots();
const map = inject(mapvueSymbol);
const props = defineProps<Props>();
const popup = shallowRef<Popup>();
const emits = defineEmits<{
  (e: "update:visible", visible: boolean): void;
}>();

const initPopup = () => {
  if (!map) return;
  destroyPopup();
  popup.value = new mapboxgl.Popup(props.options || {})
    .setLngLat(props.center)
    .addTo(map.value);
  renderToString(slots.popup()[0]).then((dom) => {
    popup.value?.setHTML(dom);
  });
  popup.value.on("open", onOpenEvent);
  popup.value.on("close", onCloseEvent);
};

const destroyPopup = () => {
  if (popup.value) {
    popup.value.off("open", onOpenEvent);
    popup.value.off("close", onCloseEvent);
    popup.value.remove();
  }
};

watch(
  () => props.visible,
  () => {
    if (props.visible) {
      initPopup();
    } else {
      destroyPopup();
    }
  }
);

watch(
  () => props.center,
  () => {
    if (props.visible) {
      if (!popup.value) initPopup();
      else {
        popup.value.setLngLat(props.center);
      }
    }
  }
);

watch(
  () => props.options?.anchor,
  () => {
    if (props.visible) initPopup();
  }
);

watch(
  () => props.options?.offset,
  () => {
    if (props.visible) {
      if (!popup.value) initPopup();
      else if (props.options.offset) {
        popup.value.setOffset(props.options.offset as PointLike);
      }
    }
  }
);

watch(
  () => props.options?.maxWidth,
  () => {
    if (props.visible) {
      if (!popup.value) initPopup();
      else if (props.options.maxWidth) {
        popup.value.setMaxWidth(props.options.maxWidth);
      }
    }
  }
);

watch(
  () => renderToString(slots.popup()[0]),
  async (dom) => {
    const html = await dom;
    if (map) {
      if (!popup.value) initPopup();
      else {
        popup.value.setHTML(html);
      }
    }
  },
  {
    immediate: true,
  }
);

const onOpenEvent = () => {
  emits("update:visible", true);
};

const onCloseEvent = () => {
  emits("update:visible", false);
  destroyPopup();
};

onMounted(() => {
  initPopup();
});

onUnmounted(() => {
  destroyPopup();
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
