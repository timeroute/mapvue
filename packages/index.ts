import type { App } from "vue";
import VMap from "./Map.vue";
import VSprite from "./Common/Sprite.vue";
import VBackgroundLayer from "./Layers/BackgroundLayer.vue";
import VCircleLayer from "./Layers/CircleLayer.vue";
import VFillExtrusionLayer from "./Layers/FillExtrusionLayer.vue";
import VFillLayer from "./Layers/FillLayer.vue";
import VHeatmapLayer from "./Layers/HeatmapLayer.vue";
import VHillshadeLayer from "./Layers/HillshadeLayer.vue";
import VLineLayer from "./Layers/LineLayer.vue";
import VRasterLayer from "./Layers/RasterLayer.vue";
import VSymbolLayer from "./Layers/SymbolLayer.vue";
import VGeoSource from "./Sources/GeoSource.vue";
import VRasterSource from "./Sources/RasterSource.vue";
import VRasterDemSource from "./Sources/RasterDemSource.vue";
import VVectorSource from "./Sources/VectorSource.vue";
import VImageSource from "./Sources/ImageSource.vue";
import VVideoSource from "./Sources/VideoSource.vue";

const MapVue = {
  install: (app: App<Element>) => {
    app.component("v-map", VMap);
    app.component("v-sprite", VSprite);
    app.component("v-background-layer", VBackgroundLayer);
    app.component("v-circle-layer", VCircleLayer);
    app.component("v-fillextrusion-layer", VFillExtrusionLayer);
    app.component("v-fill-layer", VFillLayer);
    app.component("v-heatmap-layer", VHeatmapLayer);
    app.component("v-hillshade-layer", VHillshadeLayer);
    app.component("v-line-layer", VLineLayer);
    app.component("v-raster-layer", VRasterLayer);
    app.component("v-symbol-layer", VSymbolLayer);
    app.component("v-geo-source", VGeoSource);
    app.component("v-vector-source", VVectorSource);
    app.component("v-raster-source", VRasterSource);
    app.component("v-rasterdem-source", VRasterDemSource);
    app.component("v-image-source", VImageSource);
    app.component("v-video-source", VVideoSource);
  },
};

export default MapVue;
