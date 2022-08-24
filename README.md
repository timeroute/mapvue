# MapVue 🗺️

![npm](https://img.shields.io/npm/v/mapvue)
![npm](https://img.shields.io/npm/dw/mapvue)
![NPM](https://img.shields.io/npm/l/mapvue)
![GitHub last commit](https://img.shields.io/github/last-commit/timeroute/mapvue)
![build](https://github.com/timeroute/mapvue/actions/workflows/test.yml/badge.svg)
[![codecov](https://codecov.io/gh/timeroute/mapvue/branch/main/graph/badge.svg?token=2CRUPW2YCN)](https://codecov.io/gh/timeroute/mapvue)

📄 English README ｜ [Chinese README](./README_CN.md)

👏🏻 [English Doc](https://mapvue.netlify.app/) | [Chinese Doc](https://mapvue.netlify.app/zh/)

🌰 [Examples](https://codesandbox.io/s/vmap-examples-mnqjgn)

A well-packaged MapboxGL component library

MapVue is a comprehensive MapboxGL component library. You can easily and happily apply MapVue to your Vue projects. Import various data sources and layers in the form of components, and modify the state of the layer by modifying the parameters of props.

The purpose of MapVue is to allow users to develop GIS in Vue more concisely and efficiently.

## How it works?

MapVue essentially wraps some classes in MapboxGL and implements componentization through some variable properties of the watch class.

For example, the `v-fill-layer` component actually wraps the `FillLayer` class.

## Installation

```shell
# use npm
npm install mapvue

# use yarn
yarn add mapvue

# use pnpm
pnpm add mapvue
```

## Import

### vite (recommended)

```ts
import { createApp } from "vue";
import MapVue from "mapvue";
import "mapvue/dist/mapvue.css";
import App from "./App.vue";

createApp(App).use(MapVue).mount("#app");
```

### vue-cli

```ts
import { createApp } from "vue";
import MapVue from "mapvue";
// note: the css name is not the same as in vite
import "mapvue/dist/style.css";
import App from "./App.vue";

createApp(App).use(MapVue).mount("#app");
```

## Use Component

```vue
<script setup>
import { reactive } from "vue";
import token from "some-where";
</script>

<template>
  <v-map :accessToken="token" :options="state.mapOptions">
    <v-geo-source
      id="earthquakes"
      data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
      :cluster="true"
      :clusterMaxZoom="14"
      :clusterRadius="50"
    />
    <v-circle-layer 
      id="clusters" 
      source="earthquakes"
      :filter="['has', 'point_count']"
      ...
    />
  </v-map>
</template>
```

![example](https://s3.bmp.ovh/imgs/2022/08/24/f4c4db9eda3ee3f6.png)
