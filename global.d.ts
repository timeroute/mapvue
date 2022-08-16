import Map from "./packages/Map.vue";
import Sprite from "./packages/Common/Sprite.vue";
import Marker from "./packages/Common/Marker.vue";
import Popup from "./packages/Common/Popup.vue";
import Fog from "./packages/Common/Fog.vue";
import FeatureState from "./packages/Common/FeatureState.vue";
import AttributionControl from "./packages/Controls/AttributionControl.vue";
import NavigationControl from "./packages/Controls/NavigationControl.vue";
import ScaleControl from "./packages/Controls/ScaleControl.vue";
import BackgroundLayer from "./packages/Layers/BackgroundLayer.vue";
import CircleLayer from "./packages/Layers/CircleLayer.vue";
import FillExtrusionLayer from "./packages/Layers/FillExtrusionLayer.vue";
import FillLayer from "./packages/Layers/FillLayer.vue";
import HeatmapLayer from "./packages/Layers/HeatmapLayer.vue";
import HillshadeLayer from "./packages/Layers/HillshadeLayer.vue";
import LineLayer from "./packages/Layers/LineLayer.vue";
import RasterLayer from "./packages/Layers/RasterLayer.vue";
import SymbolLayer from "./packages/Layers/SymbolLayer.vue";
import GeoSource from "./packages/Sources/GeoSource.vue";
import RasterSource from "./packages/Sources/RasterSource.vue";
import RasterDemSource from "./packages/Sources/RasterDemSource.vue";
import VectorSource from "./packages/Sources/VectorSource.vue";
import ImageSource from "./packages/Sources/ImageSource.vue";
import VideoSource from "./packages/Sources/VideoSource.vue";
import CanvasSource from "./packages/Sources/CanvasSource.vue";

declare module "vitest" {
  export interface TestContext {
    accessToken?: string;
  }
}

declare module "vue" {
  export interface GlobalComponents {
    VMap: typeof Map;
    VSprite: typeof Sprite;
    VMarker: typeof Marker;
    VPopup: typeof Popup;
    VFog: typeof Fog;
    VFeatureState: typeof FeatureState;
    VAttributionControl: typeof AttributionControl;
    VNavigationControl: typeof NavigationControl;
    VScaleControl: typeof ScaleControl;
    VBackgroundLayer: typeof BackgroundLayer;
    VCircleLayer: typeof CircleLayer;
    VFillExtrusionLayer: typeof FillExtrusionLayer;
    VFillLayer: typeof FillLayer;
    VHeatmapLayer: typeof HeatmapLayer;
    VHillshadeLayer: typeof HillshadeLayer;
    VLineLayer: typeof LineLayer;
    VRasterLayer: typeof RasterLayer;
    VSymbolLayer: typeof SymbolLayer;
    VGeoSource: typeof GeoSource;
    VRasterSource: typeof RasterSource;
    VRasterDemSource: typeof RasterDemSource;
    VVectorSource: typeof VectorSource;
    VImageSource: typeof ImageSource;
    VVideoSource: typeof VideoSource;
    VCanvasSource: typeof CanvasSource;
  }
}
