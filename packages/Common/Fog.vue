<script setup lang="ts">
import type { Expression } from "mapbox-gl";
import { inject, onMounted, onUnmounted, watch } from "vue";
import { mapvueSymbol } from "../symbols";

interface Props {
  color?: string | Expression | undefined;
  "horizon-blend"?: number | Expression | undefined;
  range?: number[] | Expression | undefined;
}

const map = inject(mapvueSymbol);
const props = defineProps<Props>();

const renderFog = (options = {}) => {
  if (!map) return;
  map.value.setFog(options);
};

watch(
  () => props.color,
  () => renderFog(props)
);

watch(
  () => props["horizon-blend"],
  () => renderFog(props)
);

watch(
  () => props.range,
  () => renderFog(props)
);

onMounted(() => {
  renderFog();
});

onUnmounted(() => {
  renderFog();
});
</script>
