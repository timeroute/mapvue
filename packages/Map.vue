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
import type { Map } from "mapbox-gl";
import { mapvueSymbol } from "./symbols";
import type { MapboxOptions } from "./map";


const props = defineProps<{
  accessToken: string;
  options: MapboxOptions;
}>();
const emits = defineEmits<{
  (e: "loaded", map?: Map): void;
}>();

// 建议在全局入口设置 accessToken，这里做兜底
if (mapboxgl.accessToken !== props.accessToken) {
  mapboxgl.accessToken = props.accessToken;
}


const mapRef = shallowRef<HTMLElement>();
const map = shallowRef<Map>();
const loaded = ref<boolean>(false);
const _map = computed(() => map.value);


defineExpose({
  map: _map,
});

provide(mapvueSymbol, _map);

// 工具函数：判断值是否变化
function isChanged<T>(a: T, b: T) {
  return JSON.stringify(a) !== JSON.stringify(b);
}

// 合并 flyTo 相关 watch，减少重复动画
watch(
  () => [props.options?.center, props.options?.zoom, props.options?.pitch, props.options?.bearing],
  ([center, zoom, pitch, bearing], [oldCenter, oldZoom, oldPitch, oldBearing]) => {
    if (!map.value) return;
    const flyOpts: any = {};
    if (center && isChanged(center, oldCenter)) flyOpts.center = center;
    if (zoom !== undefined && zoom !== oldZoom) flyOpts.zoom = zoom;
    if (pitch !== undefined && pitch !== oldPitch) flyOpts.pitch = pitch;
    if (bearing !== undefined && bearing !== oldBearing) flyOpts.bearing = bearing;
    if (Object.keys(flyOpts).length > 0) {
      map.value.flyTo(flyOpts);
    }
  }
);

// 其他属性 watch 合并
watch(
  () => props.options,
  (options, oldOptions) => {
    if (!map.value) return;
    // bounds
    if (options?.bounds && isChanged(options.bounds, oldOptions?.bounds)) {
      map.value.fitBounds(options.bounds);
    }
    // maxZoom
    if (options?.maxZoom !== undefined && options.maxZoom !== oldOptions?.maxZoom) {
      map.value.setMaxZoom(options.maxZoom);
    }
    // minZoom
    if (options?.minZoom !== undefined && options.minZoom !== oldOptions?.minZoom) {
      map.value.setMinZoom(options.minZoom);
    }
    // maxBounds
    if (options?.maxBounds && isChanged(options.maxBounds, oldOptions?.maxBounds)) {
      map.value.setMaxBounds(options.maxBounds);
    }
    // maxPitch
    if (options?.maxPitch !== undefined && options.maxPitch !== oldOptions?.maxPitch) {
      map.value.setMaxPitch(options.maxPitch);
    }
    // minPitch
    if (options?.minPitch !== undefined && options.minPitch !== oldOptions?.minPitch) {
      map.value.setMinPitch(options.minPitch);
    }
    // style
    if (options?.style && isChanged(options.style, oldOptions?.style)) {
      if (typeof options.style === 'object' && options.style !== null) {
        map.value.setStyle(options.style as any, { diff: true });
      } else {
        map.value.setStyle(options.style as string);
      }
    }
    // projection
    if (options?.projection && isChanged(options.projection, oldOptions?.projection)) {
      map.value.setProjection(options.projection as any);
    }
  },
  { deep: true }
);


onMounted(() => {
  if (mapRef.value) {
    try {
      map.value = new mapboxgl.Map({
        container: mapRef.value,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [120, 30],
        zoom: 2,
        ...props.options,
      });
      map.value.on("load", () => {
        emits("loaded", map.value);
        loaded.value = true;
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("MapboxGL 初始化失败", e);
    }
  }
});


onUnmounted(() => {
  if (map.value) {
    map.value.remove();
    map.value = undefined;
  }
});
</script>

<template>
  <div ref="mapRef" style="position: absolute; height: 100%; width: 100%" tabindex="0" />
  <slot v-if="loaded" />
</template>
