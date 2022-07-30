<script setup lang="ts">
import { reactive } from "vue";
import { accessToken } from "../../utils/mapUtil";

const state = reactive({
  options: {
    center: [120, 30],
    zoom: 4,
  },
});

const handleFly = () => {
  state.options.center = [
    Math.random() * 350 - 350 / 2,
    Math.random() * 170 - 170 / 2,
  ];
};
</script>

<template>
  <div class="container">
    <v-map :accessToken="accessToken" :options="state.options" />
  </div>
  <div class="control">
    <input type="number" :min="1" :max="22" v-model="state.options.zoom" />
    <button @click="handleFly">random position</button>
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
}
</style>
