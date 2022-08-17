<script setup lang="ts">
import { inject, onMounted, onUnmounted, watch } from "vue";
import { mapvueSymbol } from "../symbols";

interface FeatureProps {
  source: string;
  id?: string;
  sourceLayer?: string;
}
interface Props {
  feature: FeatureProps;
  state: object;
}

const map = inject(mapvueSymbol, undefined);
const props = defineProps<Props>();

const setFeatureState = (feature: FeatureProps, state: object) => {
  if (!map) return;
  if (!feature.id) return;
  map.value.setFeatureState(feature, state);
};

const removeFeatureState = (feature: FeatureProps) => {
  if (!map) return;
  if (!feature.id) return;
  map.value.removeFeatureState(feature);
};

watch(
  () => props.feature,
  (newFeature, oldFeature) => {
    removeFeatureState(oldFeature);
    setFeatureState(newFeature, props.state);
  }
);

watch(
  () => props.state,
  (state) => {
    setFeatureState(props.feature, state);
  }
);

onMounted(() => {
  setFeatureState(props.feature, props.state);
});

onUnmounted(() => {
  removeFeatureState(props.feature);
});
</script>

<template></template>
