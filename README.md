# MapVue

> The library is in developing, not recommended using in production.

A well-packaged MapboxGL component library

MapVue is a comprehensive MapboxGL component library. You can easily and happily apply MapVue to your Vue projects. Import various data sources and layers in the form of components, and modify the state of the layer by modifying the parameters of props.

The purpose of MapVue is to allow users to develop GIS in Vue more concisely and efficiently.

## How it works?

MapVue essentially wraps some classes in MapboxGL and implements componentization through some variable properties of the watch class.

For example, the `v-fill-layer` component actually wraps the `FillLayer` class.

## Installation

```shell
pnpm add mapvue
```

## Import

```ts
import { createApp } from "vue";
import MapVue from "mapvue";
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
      id="ports"
      data="https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_ports.geojson"
      :cluster="true"
    />
    <v-circle-layer id="ports" source="ports" />
  </v-map>
</template>
```
