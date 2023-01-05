import type { App } from "vue";
import VMap from "./Map.vue";
import VSprite from "./Common/Sprite.vue";
import VMarker from "./Common/Marker.vue";
import VPopup from "./Common/Popup.vue";
import VFog from "./Common/Fog.vue";
import VFeatureState from "./Common/FeatureState.vue";
import VAttributionControl from "./Controls/AttributionControl.vue";
import VNavigationControl from "./Controls/NavigationControl.vue";
import VScaleControl from "./Controls/ScaleControl.vue";
import VBackgroundLayer from "./Layers/BackgroundLayer.vue";
import VCircleLayer from "./Layers/CircleLayer.vue";
import VFillExtrusionLayer from "./Layers/FillExtrusionLayer.vue";
import VFillLayer from "./Layers/FillLayer.vue";
import VHeatmapLayer from "./Layers/HeatmapLayer.vue";
import VHillshadeLayer from "./Layers/HillshadeLayer.vue";
import VLineLayer from "./Layers/LineLayer.vue";
import VRasterLayer from "./Layers/RasterLayer.vue";
import VSymbolLayer from "./Layers/SymbolLayer.vue";
import VSkyLayer from "./Layers/SkyLayer.vue";
import VGeoSource from "./Sources/GeoSource.vue";
import VRasterSource from "./Sources/RasterSource.vue";
import VRasterDemSource from "./Sources/RasterDemSource.vue";
import VVectorSource from "./Sources/VectorSource.vue";
import VImageSource from "./Sources/ImageSource.vue";
import VVideoSource from "./Sources/VideoSource.vue";
import VCanvasSource from "./Sources/CanvasSource.vue";
import { mapvueSymbol } from "./symbols";

const MapVue = {
  install: (app: App<Element>) => {
    app.component("v-map", VMap);
    app.component("v-sprite", VSprite);
    app.component("v-marker", VMarker);
    app.component("v-popup", VPopup);
    app.component("v-fog", VFog);
    app.component("v-feature-state", VFeatureState);
    app.component("v-attribution-control", VAttributionControl);
    app.component("v-navigation-control", VNavigationControl);
    app.component("v-scale-control", VScaleControl);
    app.component("v-background-layer", VBackgroundLayer);
    app.component("v-circle-layer", VCircleLayer);
    app.component("v-fillextrusion-layer", VFillExtrusionLayer);
    app.component("v-fill-layer", VFillLayer);
    app.component("v-heatmap-layer", VHeatmapLayer);
    app.component("v-hillshade-layer", VHillshadeLayer);
    app.component("v-line-layer", VLineLayer);
    app.component("v-raster-layer", VRasterLayer);
    app.component("v-symbol-layer", VSymbolLayer);
    app.component("v-sky-layer", VSkyLayer);
    app.component("v-geo-source", VGeoSource);
    app.component("v-vector-source", VVectorSource);
    app.component("v-raster-source", VRasterSource);
    app.component("v-rasterdem-source", VRasterDemSource);
    app.component("v-image-source", VImageSource);
    app.component("v-video-source", VVideoSource);
    app.component("v-canvas-source", VCanvasSource);
  },
};

export {
  VMap,
  VFillLayer,
  VFillExtrusionLayer,
  VLineLayer,
  VCircleLayer,
  VRasterLayer,
  VBackgroundLayer,
  VHeatmapLayer,
  VHillshadeLayer,
  VSymbolLayer,
  VSkyLayer,
  VGeoSource,
  VRasterSource,
  VRasterDemSource,
  VImageSource,
  VVideoSource,
  VVectorSource,
  VCanvasSource,
  VSprite,
  VMarker,
  VPopup,
  VFog,
  VFeatureState,
  VAttributionControl,
  VNavigationControl,
  VScaleControl,
  mapvueSymbol,
};

export default MapVue;
