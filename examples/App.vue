<script setup lang="ts">
import { reactive } from "vue";
import { CirclePaint } from "mapbox-gl";

const token =
  "pk.eyJ1IjoiY2FydG9kYmluYyIsImEiOiJja202bHN2OXMwcGYzMnFrbmNkMzVwMG5rIn0.Zb3J4JTdJS-oYNXlR3nvnQ";

interface State {
  mapOptions: unknown;
  circlePaint: CirclePaint;
  layerVisible: boolean;
  filter: unknown[] | undefined;
}

const state = reactive<State>({
  mapOptions: {
    zoom: 4,
    center: [121, 33],
  },
  circlePaint: {
    "circle-color": "#ff0",
  },
  layerVisible: true,
  filter: undefined,
});

const handleChange = (index) => {
  if (index === 1) {
    state.circlePaint = {
      "circle-radius": 10,
      "circle-color": "#f00",
    };
  } else {
    state.circlePaint = {
      "circle-color": "#ff0",
    };
  }
};

const handleFilter = (index) => {
  if (index === 1) {
    state.filter = ["==", ["get", "value"], 10];
  } else {
    state.filter = undefined;
  }
};

const handleLayer = () => {
  state.layerVisible = !state.layerVisible;
};
</script>

<template>
  <div class="map">
    <v-map :accessToken="token" :options="state.mapOptions">
      <v-geo-source
        id="data"
        data="https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_ports.geojson"
        :cluster="true"
      />
      <v-circle-layer
        v-if="state.layerVisible"
        id="circle"
        source="data"
        :paint="state.circlePaint"
        :filter="state.filter"
      />
    </v-map>
    <div class="control">
      <button @click="handleChange(1)">改变颜色</button>
      <button @click="handleChange(0)">初始颜色</button>
      <button @click="handleFilter(1)">过滤数据</button>
      <button @click="handleFilter(0)">初始数据</button>
      <button @click="handleLayer">切换图层状态</button>
    </div>
  </div>
</template>

<style scoped>
.map {
  height: 100vh;
  width: 100%;
}
.control {
  position: absolute;
  left: 0;
  top: 0;
  margin: 12px;
}
</style>
