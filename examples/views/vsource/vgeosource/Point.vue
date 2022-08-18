<script setup lang="ts">
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
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
      <v-geo-source
        id="points"
        data="https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_ports.geojson"
      />
      <v-circle-layer
        id="circle"
        source="points"
        :paint="{
          'circle-color': '#f00',
          'circle-radius': 10,
        }"
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
