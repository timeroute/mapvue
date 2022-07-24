<script setup lang="ts">
import { accessToken } from "../../utils/mapUtil";

const handleLoaded = () => {
  console.log("map loaded");
  alert("map loaded");
};
</script>

<template>
  <div class="container">
    <v-map
      :accessToken="accessToken"
      :options="{
        center: [120, 30],
        zoom: 4,
      }"
      @loaded="handleLoaded"
    />
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  width: 100%;
}
</style>
