# MapVue

![npm](https://img.shields.io/npm/v/mapvue)
![npm](https://img.shields.io/npm/dw/mapvue)
![NPM](https://img.shields.io/npm/l/mapvue)
![GitHub last commit](https://img.shields.io/github/last-commit/timeroute/mapvue)
![build](https://github.com/timeroute/mapvue/actions/workflows/test.yml/badge.svg)

[English](./README.md) ｜ 中文

一个封装比较好的 MapboxGL 组件库。

MapVue 是一个全面的 MapboxGL 组件库。您可以轻松愉快地将 MapVue 应用于您的 Vue 项目。以组件的形式导入各种数据源和图层，并通过修改 props 的参数来修改图层的状态。

MapVue 的目的是让用户更简洁、高效的在 Vue 中开发 GIS。

## 它是如何工作的？

MapVue 本质上将一些类包装在 MapboxGL 中，并通过监视类的一些变量属性实现组件化。

例如，`v-fill-layer` 组件实际上包裹了 `FillLayer` 类。

## 安装

虽然基于 MapboxGL 开发，但是组件库并不将 `mapbox-gl` 整合到一个 bundle 里，需要单独安装。

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
import "mapvue/dist/mapvue.css";
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
      id="ports"
      data="https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_ports.geojson"
      :cluster="true"
    />
    <v-circle-layer id="ports" source="ports" />
  </v-map>
</template>
```
