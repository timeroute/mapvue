<script setup lang="ts">
import { accessToken } from "../../utils/mapUtil";
</script>

<template>
  <div class="container">
    <v-map
      :accessToken="accessToken"
      :options="{
        center: [120, 30],
        zoom: 4,
      }"
    >
      <v-navigation-control
        :showCompass="true"
        :showZoom="true"
        :visualizePitch="true"
      />
    </v-map>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  width: 100%;
}
</style>
