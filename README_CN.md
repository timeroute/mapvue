# MapVue 🗺️

<div align="center">

![npm](https://img.shields.io/npm/v/mapvue)
![npm](https://img.shields.io/npm/dw/mapvue)
![NPM](https://img.shields.io/npm/l/mapvue)
![GitHub last commit](https://img.shields.io/github/last-commit/timeroute/mapvue)
![build](https://github.com/timeroute/mapvue/actions/workflows/test.yml/badge.svg)
[![codecov](https://codecov.io/gh/timeroute/mapvue/branch/main/graph/badge.svg?token=2CRUPW2YCN)](https://codecov.io/gh/timeroute/mapvue)

**一个现代化的 Vue 3 地图组件库，基于 MapboxGL 构建**

[� 文档](https://mapvue.netlify.app/zh/) | [🌐 English](./README.md) | [🎮 在线体验](https://mapvuedemo.netlify.app/)

</div>

## ✨ 特性

- 🎯 **Vue 3 原生支持** - 完全基于 Vue 3 Composition API 构建
- 🧩 **组件化设计** - 地图、图层、数据源全部组件化，开箱即用
- 🔧 **TypeScript 支持** - 完整的类型定义，享受更好的开发体验
- ⚡ **响应式更新** - props 变化自动更新地图状态，无需手动操作
- 🎨 **丰富的图层类型** - 支持所有 MapboxGL 图层类型
- 📦 **Tree Shaking** - 按需引入，减少打包体积
- 🛠 **可扩展** - 提供底层 Map 实例，支持自定义扩展

## 🚀 快速开始

### 安装

```bash
# npm
npm install mapbox-gl mapvue

# yarn
yarn add mapbox-gl mapvue

# pnpm
pnpm add mapbox-gl mapvue
```

### 全局注册

```ts
import { createApp } from "vue";
import MapVue from "mapvue";
import "mapbox-gl/dist/mapbox-gl.css";
import App from "./App.vue";

const app = createApp(App);
app.use(MapVue);
app.mount("#app");
```

### 按需引入（推荐）

```vue
<script setup lang="ts">
import { VMap, VGeoSource, VCircleLayer } from "mapvue";
import "mapbox-gl/dist/mapbox-gl.css";
</script>
```

### 基础用法

```vue
<script setup lang="ts">
import { ref } from "vue";

// 替换为你的 Mapbox Access Token
const accessToken = "your-mapbox-access-token";

const mapOptions = ref({
  style: "mapbox://styles/mapbox/streets-v12",
  center: [116.3, 39.9], // 北京
  zoom: 10,
});

// 响应式数据
const center = ref([116.3, 39.9]);
const zoom = ref(10);

function flyToShanghai() {
  center.value = [121.5, 31.2]; // 上海
  zoom.value = 12;
}
</script>

<template>
  <div class="map-container">
    <v-map
      :access-token="accessToken"
      :options="{ ...mapOptions, center, zoom }"
      @loaded="onMapLoaded"
    >
      <!-- 数据源 -->
      <v-geo-source
        id="earthquakes"
        data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
        :cluster="true"
        :cluster-max-zoom="14"
        :cluster-radius="50"
      />

      <!-- 图层 -->
      <v-circle-layer
        id="clusters"
        source="earthquakes"
        :filter="['has', 'point_count']"
        :paint="{
          'circle-color': '#51bbd6',
          'circle-radius': 20,
        }"
      />

      <!-- 标记 -->
      <v-marker :center="[116.3, 39.9]" :options="{ color: '#ff0000' }">
        <div class="custom-marker">📍 北京</div>
      </v-marker>
    </v-map>

    <button @click="flyToShanghai">飞往上海</button>
  </div>
</template>

<style scoped>
.map-container {
  position: relative;
  height: 400px;
}

.custom-marker {
  background: white;
  padding: 4px 8px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
```

## 🏗 核心概念

### 组件化设计

MapVue 将 MapboxGL 的核心概念转换为 Vue 组件：

- **🗺 地图容器** - `<v-map>`
- **📊 数据源** - `<v-geo-source>`, `<v-vector-source>`, `<v-raster-source>` 等
- **🎨 图层** - `<v-circle-layer>`, `<v-fill-layer>`, `<v-line-layer>` 等
- **📍 交互元素** - `<v-marker>`, `<v-popup>`, `<v-navigation-control>` 等

### 响应式更新

所有组件都支持响应式更新，修改 props 会自动同步到地图：

```vue
<script setup>
const circleColor = ref("#ff0000");
const circleRadius = ref(5);

// 动态改变样式
setTimeout(() => {
  circleColor.value = "#00ff00";
  circleRadius.value = 10;
}, 2000);
</script>

<template>
  <v-circle-layer
    :paint="{
      'circle-color': circleColor,
      'circle-radius': circleRadius,
    }"
  />
</template>
```

## 📚 组件 API

### 地图组件

#### `<v-map>`

地图容器组件，所有其他组件必须在其内部使用。

```vue
<v-map
  :access-token="token"
  :options="mapOptions"
  @loaded="onMapLoaded"
  @click="onMapClick"
>
  <!-- 子组件 -->
</v-map>
```

**Props:**

- `access-token` (String, required) - Mapbox 访问令牌
- `options` (Object) - 地图配置选项，支持所有 MapboxGL Map 选项

**Events:**

- `loaded` - 地图加载完成时触发
- `click`, `dblclick`, `mouseenter`, `mouseleave` 等 - 地图交互事件

### 数据源组件

#### `<v-geo-source>`

GeoJSON 数据源组件。

```vue
<v-geo-source
  id="my-source"
  :data="geoJsonData"
  :cluster="true"
  :cluster-max-zoom="14"
/>
```

#### `<v-vector-source>`

矢量瓦片数据源。

```vue
<v-vector-source id="my-vector" url="mapbox://user.tileset-id" />
```

### 图层组件

#### `<v-circle-layer>`

圆形图层组件。

```vue
<v-circle-layer
  id="points"
  source="my-source"
  :paint="{
    'circle-radius': 6,
    'circle-color': '#B42222',
  }"
  :filter="['==', '$type', 'Point']"
/>
```

#### `<v-fill-layer>`

填充图层组件。

```vue
<v-fill-layer
  id="polygons"
  source="my-source"
  :paint="{
    'fill-color': '#088',
    'fill-opacity': 0.8,
  }"
/>
```

#### `<v-line-layer>`

线条图层组件。

```vue
<v-line-layer
  id="lines"
  source="my-source"
  :paint="{
    'line-color': '#088',
    'line-width': 2,
  }"
/>
```

### 交互组件

#### `<v-marker>`

地图标记组件，支持自定义 HTML 内容。

```vue
<v-marker
  :center="[lng, lat]"
  :options="{ draggable: true }"
  @click="onMarkerClick"
  @dragend="onMarkerDrag"
>
  <div class="custom-marker">
    <img src="./icon.png" alt="marker" />
  </div>
</v-marker>
```

#### `<v-popup>`

弹窗组件。

```vue
<v-popup :center="[lng, lat]" :options="{ closeButton: false }">
  <div>
    <h3>弹窗标题</h3>
    <p>弹窗内容</p>
  </div>
</v-popup>
```

#### `<v-navigation-control>`

导航控件组件。

```vue
<v-navigation-control :options="{ showCompass: true }" />
```

## 🎯 高级用法

### 获取地图实例

```vue
<script setup>
import { ref } from "vue";

const mapRef = ref();

function getMapInstance() {
  const map = mapRef.value?.map;
  if (map) {
    // 使用原生 MapboxGL API
    map.flyTo({ center: [lng, lat], zoom: 12 });
  }
}
</script>

<template>
  <v-map ref="mapRef" :access-token="token">
    <!-- 组件内容 -->
  </v-map>
</template>
```

### 动态数据更新

```vue
<script setup>
import { ref, computed } from "vue";

const earthquakes = ref([]);
const minMagnitude = ref(0);

// 计算属性自动过滤数据
const filteredData = computed(() => ({
  type: "FeatureCollection",
  features: earthquakes.value.filter(
    (item) => item.properties.magnitude >= minMagnitude.value
  ),
}));

// 模拟数据更新
setInterval(() => {
  // 更新地震数据
  fetchEarthquakes().then((data) => {
    earthquakes.value = data;
  });
}, 5000);
</script>

<template>
  <v-map :access-token="token">
    <v-geo-source id="earthquakes" :data="filteredData" />
    <v-circle-layer
      source="earthquakes"
      :paint="{
        'circle-radius': ['*', ['get', 'magnitude'], 2],
        'circle-color': [
          'interpolate',
          ['linear'],
          ['get', 'magnitude'],
          0,
          '#FCA107',
          5,
          '#FB8C00',
          8,
          '#E53E3E',
        ],
      }"
    />
  </v-map>

  <input
    v-model.number="minMagnitude"
    type="range"
    min="0"
    max="8"
    step="0.1"
  />
</template>
```

### 地图同步

```vue
<script setup>
import { ref, watch } from "vue";

const center = ref([116.3, 39.9]);
const zoom = ref(10);

// 同步多个地图视图
watch([center, zoom], ([newCenter, newZoom]) => {
  // 所有地图会自动同步
});
</script>

<template>
  <div class="map-sync">
    <v-map :access-token="token" :options="{ center, zoom }" class="map-left">
      <!-- 地图 A 内容 -->
    </v-map>

    <v-map :access-token="token" :options="{ center, zoom }" class="map-right">
      <!-- 地图 B 内容 -->
    </v-map>
  </div>
</template>
```

## 🔧 配置选项

### 地图选项

```ts
interface MapOptions {
  style?: string | object;
  center?: [number, number];
  zoom?: number;
  bearing?: number;
  pitch?: number;
  bounds?: [[number, number], [number, number]];
  maxZoom?: number;
  minZoom?: number;
  maxBounds?: [[number, number], [number, number]];
  projection?: string;
  // ... 更多 MapboxGL 选项
}
```

### 主题样式

支持所有 Mapbox 官方样式和自定义样式：

```vue
<v-map
  :options="{
    style: 'mapbox://styles/mapbox/streets-v12', // 街道
    // style: 'mapbox://styles/mapbox/satellite-v9'     // 卫星
    // style: 'mapbox://styles/mapbox/dark-v11'         // 暗色
    // style: 'mapbox://styles/mapbox/light-v11'        // 亮色
    // style: customStyle                               // 自定义样式
  }"
/>
```

## 🤝 贡献

我们欢迎任何形式的贡献！

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

[MIT](./LICENSE) © MapVue Team

## 🙏 致谢

- [MapboxGL JS](https://docs.mapbox.com/mapbox-gl-js/) - 强大的地图引擎
- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架

![example](https://s3.bmp.ovh/imgs/2022/08/24/f4c4db9eda3ee3f6.png)
