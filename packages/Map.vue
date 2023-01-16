<script lang="ts" setup>
import {
  computed,
  onMounted,
  onUnmounted,
  provide,
  ref,
  shallowRef,
  watch,
} from "vue";
import mapboxgl from "mapbox-gl";
import type { Map, LngLatLike } from "mapbox-gl";
import { mapvueSymbol } from "./symbols";
import type { MapboxOptions } from "./map";

interface Props {
  accessToken: string;
  options: MapboxOptions;
}

const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "loaded"): void;
}>();
// eslint-disable-next-line vue/no-setup-props-destructure
mapboxgl.accessToken = props.accessToken;

const mapRef = shallowRef<HTMLElement>();
const map = shallowRef<Map>();
const loaded = ref<boolean>(false);
const _map = computed(() => map.value);

defineExpose({
  map: _map,
});

provide(mapvueSymbol, _map);

watch(
  () => props.options?.center,
  (center) => {
    if (!map.value || !center) return;
    map.value.flyTo({
      center: center as LngLatLike,
    });
  }
);

watch(
  () => props.options?.zoom,
  (zoom) => {
    if (!map.value || zoom === undefined) return;
    map.value.flyTo({
      zoom,
    });
  }
);

watch(
  () => props.options?.pitch,
  (pitch) => {
    if (!map.value || pitch === undefined) return;
    map.value.flyTo({
      pitch,
    });
  }
);

watch(
  () => props.options?.bearing,
  (bearing) => {
    if (!map.value || bearing === undefined) return;
    map.value.flyTo({
      bearing,
    });
  }
);

watch(
  () => props.options?.bounds,
  (bounds) => {
    if (!map.value || !bounds) return;
    map.value.fitBounds(bounds);
  }
);

watch(
  () => props.options?.maxZoom,
  (maxZoom) => {
    if (!map.value || maxZoom === undefined) return;
    map.value.setMaxZoom(maxZoom);
  }
);

watch(
  () => props.options?.minZoom,
  (minZoom) => {
    if (!map.value || minZoom === undefined) return;
    map.value.setMinZoom(minZoom);
  }
);

watch(
  () => props.options?.maxBounds,
  (maxBounds) => {
    if (!map.value || !maxBounds) return;
    map.value.setMaxBounds(maxBounds);
  }
);

watch(
  () => props.options?.maxPitch,
  (maxPitch) => {
    if (!map.value || maxPitch === undefined) return;
    map.value.setMaxPitch(maxPitch);
  }
);

watch(
  () => props.options?.minPitch,
  (minPitch) => {
    if (!map.value || minPitch === undefined) return;
    map.value.setMinPitch(minPitch);
  }
);

watch(
  () => props.options?.style,
  (style) => {
    if (!map.value || !style) return;
    if (style instanceof Object) {
      map.value?.setStyle(style, {
        diff: true,
      });
    } else {
      map.value.setStyle(style);
    }
  }
);

watch(
  () => props.options?.projection,
  (projection) => {
    if (!map.value) return;
    map.value.setProjection(projection as any);
  }
);

onMounted(() => {
  if (mapRef.value) {
    map.value = new mapboxgl.Map({
      container: mapRef.value,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [120, 30],
      zoom: 2,
      ...props.options,
    });
    map.value.on("load", () => {
      emits("loaded");
      loaded.value = true;
    });
  }
});

onUnmounted(() => {
  if (map.value) map.value.remove();
});
</script>

<template>
  <div ref="mapRef" style="position: absolute; height: 100%; width: 100%" />
  <slot v-if="loaded" />
</template>
