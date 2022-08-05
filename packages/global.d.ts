import Map from "./Map.vue";
import Sprite from "./Common/Sprite.vue";
import Marker from "./Common/Marker.vue";
import Popup from "./Common/Popup.vue";
import Fog from "./Common/Fog.vue";
import FeatureState from "./Common/FeatureState.vue";
import AttributionControl from "./Controls/AttributionControl.vue";
import NavigationControl from "./Controls/NavigationControl.vue";
import ScaleControl from "./Controls/ScaleControl.vue";
import BackgroundLayer from "./Layers/BackgroundLayer.vue";
import CircleLayer from "./Layers/CircleLayer.vue";
import FillExtrusionLayer from "./Layers/FillExtrusionLayer.vue";
import FillLayer from "./Layers/FillLayer.vue";
import HeatmapLayer from "./Layers/HeatmapLayer.vue";
import HillshadeLayer from "./Layers/HillshadeLayer.vue";
import LineLayer from "./Layers/LineLayer.vue";
import RasterLayer from "./Layers/RasterLayer.vue";
import SymbolLayer from "./Layers/SymbolLayer.vue";
import GeoSource from "./Sources/GeoSource.vue";
import RasterSource from "./Sources/RasterSource.vue";
import RasterDemSource from "./Sources/RasterDemSource.vue";
import VectorSource from "./Sources/VectorSource.vue";
import ImageSource from "./Sources/ImageSource.vue";
import VideoSource from "./Sources/VideoSource.vue";
import CanvasSource from "./Sources/CanvasSource.vue";

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
