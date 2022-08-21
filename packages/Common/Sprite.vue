<script setup lang="ts">
import { inject, onMounted, onUnmounted, watch } from "vue";
import { mapvueSymbol } from "../symbols";

interface Props {
  name: string;
  url?: HTMLImageElement | ImageBitmap | string;
}

const map = inject(mapvueSymbol, undefined);
const props = defineProps<Props>();

const updateImage = () => {
  if (!map) return;
  const hasImage = map.value.hasImage(props.name);
  if (typeof props.url === "string") {
    map.value.loadImage(props.url, (err, image) => {
      if (err) return;
      if (!image) return;
      if (hasImage) {
        map.value.updateImage(props.name, image);
      } else {
        map.value.addImage(props.name, image);
      }
    });
  } else {
    if (hasImage) {
      map.value.updateImage(props.name, props.url as ImageBitmap);
    } else {
      map.value.addImage(props.name, props.url as ImageBitmap);
    }
  }
};

watch(() => props.url, updateImage);

onMounted(updateImage);

onUnmounted(() => {
  if (map && map.value.hasImage(props.name)) {
    map.value.removeImage(props.name);
  }
});
</script>

<template></template>
