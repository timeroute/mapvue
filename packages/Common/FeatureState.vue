<script setup lang="ts">
import { inject, onMounted, onUnmounted, watch } from "vue";
import { mapvueSymbol } from "../symbols";

interface FeatureProps {
  source: string;
  id: string | undefined;
  sourceLayer?: string;
}
interface Props {
  feature: FeatureProps;
  state: object;
}

const map = inject(mapvueSymbol);
const props = defineProps<Props>();

const setFeatureState = () => {
  if (!map) return;
  if (!props.feature.id || !props.feature.source) return;
  map.value.setFeatureState(props.feature, props.state);
};

watch(
  () => props.feature,
  (newFeature, oldFeature) => {
    if (!map) return;
    console.log(newFeature, oldFeature);

    map.value.removeFeatureState(oldFeature);
    map.value.setFeatureState(newFeature, props.state);
  }
);

watch(() => props.state, setFeatureState);

onMounted(() => setFeatureState());

onUnmounted(() => {
  if (!map) return;
  map.value.removeFeatureState(props.feature);
});
</script>

<template></template>
