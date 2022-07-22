<script setup lang="ts">
import { inject, onMounted, onUnmounted, watch } from "vue";
import { mapvueSymbol } from "../symbols";

interface Props {
  name: string;
  url: HTMLImageElement | ImageBitmap | string | undefined;
}

const map = inject(mapvueSymbol);
const props = defineProps<Props>();

const updateImage = () => {
  if (!map) return;
  const doImage = map.value.hasImage(props.name)
    ? map.value.updateImage
    : map.value.addImage;
  if (
    props.url instanceof HTMLImageElement ||
    props.url instanceof ImageBitmap
  ) {
    doImage(props.name, props.url);
  } else if (typeof props.url === "string") {
    map.value.loadImage(props.url, (err, image) => {
      if (err || !image) return;
      doImage(props.name, image);
    });
  }
};

watch(
  () => props.url,
  () => {
    updateImage();
  }
);

onMounted(() => {
  updateImage();
});

onUnmounted(() => {
  if (map && map.value.hasImage(props.name)) {
    map.value.removeImage(props.name);
  }
});
</script>
