<script setup lang="ts">
import { inject, onMounted, onUnmounted, watch } from "vue";
import { mapvueSymbol } from "../symbols";

interface Props {
  name: string;
  url?: string;
}

const map = inject(mapvueSymbol, undefined);
const props = defineProps<Props>();

const updateImage = () => {
  if (!map) return;
  map.value.loadImage(props.url, (err, image) => {
    if (err) return;
    if (!image) return;
    const hasImage = map.value.hasImage(props.name);
    if (hasImage) {
      map.value.updateImage(props.name, image);
    } else {
      map.value.addImage(props.name, image);
    }
  });
};

watch(() => props.url, updateImage);

watch(
  () => props.name,
  () => {
    const hasImage = map.value.hasImage(props.name);
    if (hasImage) {
      map.value.removeImage(props.name);
    }
    updateImage();
  }
);

onMounted(updateImage);

onUnmounted(() => {
  if (map && map.value.hasImage(props.name)) {
    map.value.removeImage(props.name);
  }
});
</script>

<template></template>
