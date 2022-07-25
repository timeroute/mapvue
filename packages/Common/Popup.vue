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
  popup.value = new mapboxgl.Popup(props.options || {})
    .setLngLat(props.center)
    .addTo(map.value);
  renderToString(slots.popup()[0]).then((dom) => {
    popup.value?.setHTML(dom);
  });
  popup.value.on("close", onCloseEvent);
};

const destroyPopup = () => {
  if (popup.value) {
    popup.value.off("close", onCloseEvent);
    popup.value.remove();
    popup.value = undefined;
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
    if (props.visible && popup.value) {
      popup.value.setLngLat(props.center);
    }
  }
);

watch(
  () => props.options?.anchor,
  () => {
    if (props.visible) {
      destroyPopup();
      initPopup();
    }
  }
);

watch(
  () => props.options?.offset,
  () => {
    if (props.visible && popup.value && props.options.offset) {
      popup.value.setOffset(props.options.offset as PointLike);
    }
  }
);

watch(
  () => props.options?.maxWidth,
  () => {
    if (props.visible && popup.value && props.options.maxWidth) {
      popup.value.setMaxWidth(props.options.maxWidth);
    }
  }
);

watch(
  () => renderToString(slots.popup()[0]),
  async (dom) => {
    const html = await dom;
    if (!popup.value) initPopup();
    popup.value.setHTML(html);
  },
  {
    immediate: true,
  }
);

const onCloseEvent = () => {
  console.log("close event");
  emits("update:visible", false);
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
