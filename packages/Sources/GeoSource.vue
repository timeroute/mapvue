<script setup lang="ts">
import { inject, onMounted, onUnmounted, shallowRef, watch } from "vue";
import { mapvueSymbol } from "../symbols";
import type {
  AnySourceImpl,
  GeoJSONSource,
  GeoJSONSourceRaw,
  PromoteIdSpecification,
} from "mapbox-gl";
import type { GeoJSON } from "geojson";

interface Props {
  id: string;
  data:
    | GeoJSON.Feature<GeoJSON.Geometry>
    | GeoJSON.FeatureCollection<GeoJSON.Geometry>
    | string
    | undefined;
  attribution?: string;
  buffer?: number;
  cluster?: boolean;
  clusterMaxZoom?: number;
  clusterMinPoints?: number;
  clusterProperties?: object | undefined;
  clusterRadius?: number;
  filter?: boolean | unknown[] | null | undefined;
  generatedId?: boolean;
  lineMetrics?: boolean;
  maxzoom?: number;
  protomteId?: PromoteIdSpecification | undefined;
  tolerance?: number;
}

const source = shallowRef<AnySourceImpl>();
const map = inject(mapvueSymbol);
const props = defineProps<Props>();

watch(
  () => props.data,
  (data) => {
    if (data) {
      (source.value as GeoJSONSource).setData(data);
    }
  }
);

onMounted(() => {
  if (map) {
    const options: GeoJSONSourceRaw = {
      type: "geojson",
      data: props.data,
      buffer: props.buffer ?? 128,
      cluster: props.cluster || false,
      generateId: props.generatedId || false,
      lineMetrics: props.lineMetrics || false,
      maxzoom: props.maxzoom ?? 18,
      tolerance: props.tolerance ?? 0.375,
    };

    if (props.filter) {
      options.filter = props.filter;
    }
    if (props.attribution) {
      options.attribution = props.attribution;
    }
    if (props.protomteId) {
      options.promoteId = props.protomteId;
    }
    if (props.cluster) {
      if (props.clusterMaxZoom) {
        options.clusterMaxZoom = props.clusterMaxZoom;
      }
      if (props.clusterMinPoints) {
        options.clusterMinPoints = props.clusterMinPoints;
      }
      if (props.clusterProperties) {
        options.clusterProperties = props.clusterProperties;
      }
      if (props.clusterRadius) {
        options.clusterRadius = props.clusterRadius;
      }
    }
    map.value.addSource(props.id, {
      type: "geojson",
      data: props.data,
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

<template></template>
