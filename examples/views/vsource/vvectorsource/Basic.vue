<script setup lang="ts">
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
</script>

<template>
  <div class="container">
    <v-map
      :accessToken="accessToken"
      :options="{
        center: [-87.622088, 41.878781],
        zoom: 12,
      }"
    >
      <v-vector-source
        id="tiles"
        :tiles="[
          'https://tiles.mapillary.com/maps/vtp/mly1_public/2/{z}/{x}/{y}?access_token=MLY|4142433049200173|72206abe5035850d6743b23a49c41333',
        ]"
        :minzoom="6"
        :maxzoom="14"
      />
      <v-line-layer
        id="tiles"
        source="tiles"
        :paint="{
          'line-opacity': 0.6,
          'line-color': 'rgb(53, 175, 109)',
          'line-width': 2,
        }"
        sourceLayer="sequence"
        :layout="{
          'line-cap': 'round',
          'line-join': 'round',
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
