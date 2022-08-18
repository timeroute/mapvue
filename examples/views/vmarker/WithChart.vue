<script setup lang="ts">
import type { LngLatLike } from "mapbox-gl";
import { watch, ref, reactive, onUnmounted } from "vue";
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
import { Chart, ArcElement, PieController } from "chart.js";

Chart.register(ArcElement, PieController);

const chartRef = ref();
const chart = ref();
const state = reactive({
  center: [120, 30] as LngLatLike,
  draggable: false,
  visible: true,
  scale: 1,
  text: "Hi",
});

watch(
  () => state.center,
  () => {
    console.log(state.center);
  }
);

const toggleDraggable = () => {
  state.draggable = !state.draggable;
};

const handleClick = () => {
  state.text += ", MapVue";
  state.visible = true;
};

const handleMouseEnter = () => {
  state.visible = true;
};

const handleMouseMove = () => {
  // console.log("mouse move");
};

const handleMouseLeave = () => {
  state.visible = false;
};

watch(
  () => chartRef.value,
  () => {
    if (chartRef.value) {
      const ctx = chartRef.value.getContext("2d");
      chart.value = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Red", "Blue", "Yellow"],
          datasets: [
            {
              label: "My First Dataset",
              data: [300, 50, 100],
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
              ],
              hoverOffset: 4,
            },
          ],
        },
      });
    }
  }
);

onUnmounted(() => {
  if (chart.value) chart.value.destroy();
});
</script>

<template>
  <div class="container">
    <v-map
      :accessToken="accessToken"
      :options="{
        center: state.center,
        zoom: 4,
      }"
    >
      <v-marker
        v-model:center="state.center"
        :options="{
          draggable: state.draggable,
          scale: state.scale,
        }"
        @click="handleClick"
        @mouseenter="handleMouseEnter"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
      >
        <canvas ref="chartRef" width="100" height="100"></canvas>
      </v-marker>
      <v-popup
        v-model:visible="state.visible"
        :center="state.center"
        :options="{
          anchor: 'bottom',
          offset: [0, -36],
          // closeOnClick: false,
          closeOnMove: false,
        }"
      >
        {{ state.text }}
      </v-popup>
    </v-map>
    <div class="control">
      <label>toggle draggable</label>
      <button @click="toggleDraggable">toggle draggable</button>
      <label>set scale(1-5)</label>
      <input type="range" v-model="state.scale" :min="1" :max="5" />
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  width: 100%;
}
.control {
  position: absolute;
  right: 0;
  top: 0;
  margin: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: white;
  padding: 8px;
}
</style>
