# MapVue 🗺️

<div align="center">

![npm](https://img.shields.io/npm/v/mapvue)
![npm](https://img.shields.io/npm/dw/mapvue)
![NPM](https://img.shields.io/npm/l/mapvue)
![GitHub last commit](https://img.shields.io/github/last-commit/timeroute/mapvue)
![build](https://github.com/timeroute/mapvue/actions/workflows/test.yml/badge.svg)
[![codecov](https://codecov.io/gh/timeroute/mapvue/branch/main/graph/badge.svg?token=2CRUPW2YCN)](https://codecov.io/gh/timeroute/mapvue)

**A modern Vue 3 map component library built on MapboxGL**

[� Documentation](https://mapvue.netlify.app/) | [🇨🇳 中文](./README_CN.md) | [🎮 Live Demo](https://codesandbox.io/s/vmap-examples-mnqjgn)

</div>

## ✨ Features

- 🎯 **Vue 3 Native** - Built entirely with Vue 3 Composition API
- 🧩 **Component-Based** - Maps, layers, and data sources as Vue components
- 🔧 **TypeScript Support** - Full type definitions for better DX
- ⚡ **Reactive Updates** - Props changes automatically update map state
- 🎨 **Rich Layer Types** - Support for all MapboxGL layer types
- 📦 **Tree Shaking** - Import only what you need
- 🛠 **Extensible** - Access to underlying Map instance for custom extensions

## 🚀 Quick Start

### Installation

```bash
# npm
npm install mapbox-gl mapvue

# yarn
yarn add mapbox-gl mapvue

# pnpm
pnpm add mapbox-gl mapvue
```

### Global Registration

```ts
import { createApp } from "vue";
import MapVue from "mapvue";
import "mapbox-gl/dist/mapbox-gl.css";
import App from "./App.vue";

const app = createApp(App);
app.use(MapVue);
app.mount("#app");
```

### On-Demand Import (Recommended)

```vue
<script setup lang="ts">
import { VMap, VGeoSource, VCircleLayer } from "mapvue";
import "mapbox-gl/dist/mapbox-gl.css";
</script>
```

### Basic Usage

```vue
<script setup lang="ts">
import { ref } from "vue";

// Replace with your Mapbox Access Token
const accessToken = "your-mapbox-access-token";

const mapOptions = ref({
  style: "mapbox://styles/mapbox/streets-v12",
  center: [-74.006, 40.7128], // New York
  zoom: 10,
});

// Reactive data
const center = ref([-74.006, 40.7128]);
const zoom = ref(10);

function flyToLA() {
  center.value = [-118.2437, 34.0522]; // Los Angeles
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
      <!-- Data Source -->
      <v-geo-source
        id="earthquakes"
        data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
        :cluster="true"
        :cluster-max-zoom="14"
        :cluster-radius="50"
      />

      <!-- Layer -->
      <v-circle-layer
        id="clusters"
        source="earthquakes"
        :filter="['has', 'point_count']"
        :paint="{
          'circle-color': '#51bbd6',
          'circle-radius': 20,
        }"
      />

      <!-- Marker -->
      <v-marker :center="[-74.006, 40.7128]" :options="{ color: '#ff0000' }">
        <div class="custom-marker">📍 New York</div>
      </v-marker>
    </v-map>

    <button @click="flyToLA">Fly to LA</button>
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

## 🏗 Core Concepts

### Component-Based Design

MapVue transforms MapboxGL core concepts into Vue components:

- **🗺 Map Container** - `<v-map>`
- **📊 Data Sources** - `<v-geo-source>`, `<v-vector-source>`, `<v-raster-source>`, etc.
- **🎨 Layers** - `<v-circle-layer>`, `<v-fill-layer>`, `<v-line-layer>`, etc.
- **📍 Interactive Elements** - `<v-marker>`, `<v-popup>`, `<v-navigation-control>`, etc.

### Reactive Updates

All components support reactive updates - modify props to automatically sync with the map:

```vue
<script setup>
const circleColor = ref("#ff0000");
const circleRadius = ref(5);

// Dynamic style changes
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

## 📚 Component API

### Map Components

#### `<v-map>`

The map container component where all other components must be used inside.

```vue
<v-map
  :access-token="token"
  :options="mapOptions"
  @loaded="onMapLoaded"
  @click="onMapClick"
>
  <!-- Child components -->
</v-map>
```

**Props:**

- `access-token` (String, required) - Mapbox access token
- `options` (Object) - Map configuration options, supports all MapboxGL Map options

**Events:**

- `loaded` - Emitted when map is loaded
- `click`, `dblclick`, `mouseenter`, `mouseleave`, etc. - Map interaction events

### Data Source Components

#### `<v-geo-source>`

GeoJSON data source component.

```vue
<v-geo-source
  id="my-source"
  :data="geoJsonData"
  :cluster="true"
  :cluster-max-zoom="14"
/>
```

#### `<v-vector-source>`

Vector tile data source.

```vue
<v-vector-source id="my-vector" url="mapbox://user.tileset-id" />
```

### Layer Components

#### `<v-circle-layer>`

Circle layer component.

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

Fill layer component.

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

Line layer component.

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

### Interactive Components

#### `<v-marker>`

Map marker component with custom HTML content support.

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

Popup component.

```vue
<v-popup :center="[lng, lat]" :options="{ closeButton: false }">
  <div>
    <h3>Popup Title</h3>
    <p>Popup content</p>
  </div>
</v-popup>
```

#### `<v-navigation-control>`

Navigation control component.

```vue
<v-navigation-control :options="{ showCompass: true }" />
```

## 🎯 Advanced Usage

### Access Map Instance

```vue
<script setup>
import { ref } from "vue";

const mapRef = ref();

function getMapInstance() {
  const map = mapRef.value?.map;
  if (map) {
    // Use native MapboxGL API
    map.flyTo({ center: [lng, lat], zoom: 12 });
  }
}
</script>

<template>
  <v-map ref="mapRef" :access-token="token">
    <!-- Component content -->
  </v-map>
</template>
```

### Dynamic Data Updates

```vue
<script setup>
import { ref, computed } from "vue";

const earthquakes = ref([]);
const minMagnitude = ref(0);

// Computed property automatically filters data
const filteredData = computed(() => ({
  type: "FeatureCollection",
  features: earthquakes.value.filter(
    (item) => item.properties.magnitude >= minMagnitude.value
  ),
}));

// Simulate data updates
setInterval(() => {
  // Update earthquake data
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

### Map Synchronization

```vue
<script setup>
import { ref, watch } from "vue";

const center = ref([-74.006, 40.7128]);
const zoom = ref(10);

// Sync multiple map views
watch([center, zoom], ([newCenter, newZoom]) => {
  // All maps will automatically sync
});
</script>

<template>
  <div class="map-sync">
    <v-map :access-token="token" :options="{ center, zoom }" class="map-left">
      <!-- Map A content -->
    </v-map>

    <v-map :access-token="token" :options="{ center, zoom }" class="map-right">
      <!-- Map B content -->
    </v-map>
  </div>
</template>
```

## 🔧 Configuration

### Map Options

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
  // ... more MapboxGL options
}
```

### Theme Styles

Supports all Mapbox official styles and custom styles:

```vue
<v-map
  :options="{
    style: 'mapbox://styles/mapbox/streets-v12', // Streets
    // style: 'mapbox://styles/mapbox/satellite-v9'     // Satellite
    // style: 'mapbox://styles/mapbox/dark-v11'         // Dark
    // style: 'mapbox://styles/mapbox/light-v11'        // Light
    // style: customStyle                               // Custom style
  }"
/>
```

## 🤝 Contributing

We welcome contributions of any kind!

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

[MIT](./LICENSE) © MapVue Team

## 🙏 Acknowledgments

- [MapboxGL JS](https://docs.mapbox.com/mapbox-gl-js/) - Powerful mapping engine
- [Vue.js](https://vuejs.org/) - The Progressive JavaScript Framework

![example](https://s3.bmp.ovh/imgs/2022/08/24/f4c4db9eda3ee3f6.png)
