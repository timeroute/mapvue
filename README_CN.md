# MapVue 🗺️

![npm](https://img.shields.io/npm/v/mapvue)
![npm](https://img.shields.io/npm/dw/mapvue)
![NPM](https://img.shields.io/npm/l/mapvue)
![GitHub last commit](https://img.shields.io/github/last-commit/timeroute/mapvue)
![build](https://github.com/timeroute/mapvue/actions/workflows/test.yml/badge.svg)
[![codecov](https://codecov.io/gh/timeroute/mapvue/branch/main/graph/badge.svg?token=2CRUPW2YCN)](https://codecov.io/gh/timeroute/mapvue)

📄 [英文 README](./README.md) ｜ 中文 README

👏🏻 [英文文档](https://mapvue.netlify.app/) | [中文文档](https://mapvue.netlify.app/zh/)

🌰 [举些例子](https://codesandbox.io/s/vmap-examples-mnqjgn)

一个封装比较好的 MapboxGL 组件库。

MapVue 是一个全面的 MapboxGL 组件库。您可以轻松愉快地将 MapVue 应用于您的 Vue 项目。以组件的形式导入各种数据源和图层，并通过修改 props 的参数来修改图层的状态。

MapVue 的目的是让用户更简洁、高效的在 Vue 中开发 GIS。

## 它是如何工作的？

MapVue 本质上将一些类包装在 MapboxGL 中，并通过监视类的一些变量属性实现组件化。

例如，`v-fill-layer` 组件实际上包裹了 `FillLayer` 类。

## 安装

```shell
# use npm
npm install mapbox-gl mapvue

# use yarn
yarn add mapbox-gl mapvue

# use pnpm
pnpm add mapbox-gl mapvue
```

## 导入


```ts
import { createApp } from "vue";
import MapVue from "mapvue";
import 'mapbox-gl/dist/mapbox-gl.css';
import App from "./App.vue";

createApp(App).use(MapVue).mount("#app");
```

## 使用

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
