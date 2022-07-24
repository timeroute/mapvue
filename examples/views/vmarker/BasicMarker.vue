<script setup lang="ts">
import { watch } from "vue";
import { reactive } from "vue";
import { accessToken } from "../../utils/mapUtil";

const state = reactive({
  center: [120, 30],
  draggable: false,
  scale: 1,
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
      />
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
