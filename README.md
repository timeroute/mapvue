# MapVue

<p>
  <a href="https://npmjs.com/package/mapvue"><img src="https://img.shields.io/npm/v/mapvue.svg" alt="npm package"></a>
</p>

> The library is in developing, although basic development is complete, it is still not recommended for use in production environments.

English ｜ [中文](./README_CN.md)

A well-packaged MapboxGL component library

MapVue is a comprehensive MapboxGL component library. You can easily and happily apply MapVue to your Vue projects. Import various data sources and layers in the form of components, and modify the state of the layer by modifying the parameters of props.

The purpose of MapVue is to allow users to develop GIS in Vue more concisely and efficiently.

## How it works?

MapVue essentially wraps some classes in MapboxGL and implements componentization through some variable properties of the watch class.

For example, the `v-fill-layer` component actually wraps the `FillLayer` class.

## Installation

Although based on MapboxGL, the component library does not integrate 'mapbox-gl' into a bundle and needs to be installed separately.

```shell
# use npm
npm install mapbox-gl mapvue

# use yarn
yarn add mapbox-gl mapvue

# use pnpm
pnpm add mapbox-gl mapvue
```

## Import

```ts
import { createApp } from "vue";
import MapVue from "mapvue";
import "mapvue/dist/mapvue.css";
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
      id="ports"
      data="https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_ports.geojson"
      :cluster="true"
    />
    <v-circle-layer id="ports" source="ports" />
  </v-map>
</template>
```
