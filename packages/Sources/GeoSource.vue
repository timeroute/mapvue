<script setup lang="ts">
import { inject, onMounted, onUnmounted, shallowRef, watch } from "vue";
import { mapvueSymbol } from "../symbols";
import type {
  AnySourceImpl,
  GeoJSONSource,
  GeoJSONSourceRaw,
  PromoteIdSpecification,
} from "mapbox-gl";
import type {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
} from "geojson";

interface Props {
  id: string;
  data: object | string;
  attribution?: string;
  buffer?: number;
  cluster?: boolean;
  clusterMaxZoom?: number;
  clusterMinPoints?: number;
  clusterProperties?: object;
  clusterRadius?: number;
  filter?: boolean | unknown[] | null;
  generateId?: boolean;
  lineMetrics?: boolean;
  maxzoom?: number;
  protomteId?: PromoteIdSpecification;
  tolerance?: number;
}

const source = shallowRef<AnySourceImpl>();
const map = inject(mapvueSymbol, undefined);
const props = defineProps<Props>();

watch(
  () =>
    props.data as
      | string
      | Feature<Geometry, GeoJsonProperties>
      | FeatureCollection<Geometry, GeoJsonProperties>,
  (
    data:
      | string
      | Feature<Geometry, GeoJsonProperties>
      | FeatureCollection<Geometry, GeoJsonProperties>
  ) => {
    if (!map) return;
    if (!data || !source.value) return;
    (source.value as GeoJSONSource).setData(data);
  },
  {
    deep: true,
  }
);

onMounted(() => {
  if (!map) return;
  const options: GeoJSONSourceRaw = {
    type: "geojson",
    data: props.data as
      | string
      | Feature<Geometry, GeoJsonProperties>
      | FeatureCollection<Geometry, GeoJsonProperties>,
  };

  if (props.buffer !== undefined) {
    options.buffer = props.buffer;
  }

  if (props.generateId) {
    options.generateId = props.generateId;
  }

  if (props.lineMetrics) {
    options.lineMetrics = props.lineMetrics;
  }

  if (props.maxzoom !== undefined) {
    options.maxzoom = props.maxzoom;
  }

  if (props.tolerance !== undefined) {
    options.tolerance = props.tolerance;
  }

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
    options.cluster = props.cluster;
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

  map.value.addSource(props.id, options);
  source.value = map.value.getSource(props.id);
});

onUnmounted(() => {
  if (!map || !source.value) return;
  map.value.removeSource(props.id);
});
</script>

<template></template>
