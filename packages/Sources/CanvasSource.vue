<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref, shallowRef, watch } from "vue";
import type { AnySourceImpl, CanvasSource } from "mapbox-gl";
import { mapvueSymbol } from "../symbols";

interface Props {
  id: string;
  animate?: boolean;
  coordinates: Array<Array<number>>;
}

const canvasRef = ref();
const source = shallowRef<AnySourceImpl>();
const map = inject(mapvueSymbol, undefined);
const props = defineProps<Props>();

defineExpose({
  canvas: canvasRef,
});

watch(
  () => props.coordinates,
  (coordinates) => {
    (source.value as CanvasSource).setCoordinates(coordinates);
  }
);

watch(
  () => props.animate,
  () => {
    if (props.animate) {
      (source.value as CanvasSource).play();
    } else {
      (source.value as CanvasSource).pause();
    }
  }
);

onMounted(() => {
  if (map) {
    map.value.addSource(props.id, {
      type: "canvas",
      canvas: canvasRef.value,
      animate: props.animate || false,
      coordinates: props.coordinates,
    });
    source.value = map.value.getSource(props.id);
  }
});

onUnmounted(() => {
  if (map && source.value) {
    map.value.removeSource(props.id);
  }
});
</script>

<template>
  <canvas style="display: none" ref="canvasRef" height="400" width="400" />
</template>
