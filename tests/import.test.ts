import { describe, test, expect } from "vitest";

describe("import vue components", () => {
  test("normal imports as expected", () => {
    const Map = import("../packages/Map.vue");
    expect(Map).toBeDefined();
    const Fog = import("../packages/Common/Fog.vue");
    expect(Fog).toBeDefined();
    const Marker = import("../packages/Common/Marker.vue");
    expect(Marker).toBeDefined();
    const FeatureState = import("../packages/Common/FeatureState.vue");
    expect(FeatureState).toBeDefined();
    const Sprite = import("../packages/Common/Sprite.vue");
    expect(Sprite).toBeDefined();
    const AttributionControl = import(
      "../packages/Controls/AttributionControl.vue"
    );
    expect(AttributionControl).toBeDefined();
    const NavigationControl = import(
      "../packages/Controls/NavigationControl.vue"
    );
    expect(NavigationControl).toBeDefined();
    const ScaleControl = import("../packages/Controls/ScaleControl.vue");
    expect(ScaleControl).toBeDefined();
    const CanvasSource = import("../packages/Sources/CanvasSource.vue");
    expect(CanvasSource).toBeDefined();
    const GeoSource = import("../packages/Sources/GeoSource.vue");
    expect(GeoSource).toBeDefined();
    const ImageSource = import("../packages/Sources/ImageSource.vue");
    expect(ImageSource).toBeDefined();
    const VideoSource = import("../packages/Sources/VideoSource.vue");
    expect(VideoSource).toBeDefined();
    const RasterSource = import("../packages/Sources/RasterSource.vue");
    expect(RasterSource).toBeDefined();
    const RasterDemSource = import("../packages/Sources/RasterDemSource.vue");
    expect(RasterDemSource).toBeDefined();
    const VectorSource = import("../packages/Sources/VectorSource.vue");
    expect(VectorSource).toBeDefined();
    const BackgroundLayer = import("../packages/Layers/BackgroundLayer.vue");
    expect(BackgroundLayer).toBeDefined();
    const CircleLayer = import("../packages/Layers/CircleLayer.vue");
    expect(CircleLayer).toBeDefined();
    const FillExtrusionLayer = import(
      "../packages/Layers/FillExtrusionLayer.vue"
    );
    expect(FillExtrusionLayer).toBeDefined();
    const FillLayer = import("../packages/Layers/FillLayer.vue");
    expect(FillLayer).toBeDefined();
    const HillshadeLayer = import("../packages/Layers/HillshadeLayer.vue");
    expect(HillshadeLayer).toBeDefined();
    const HeatmapLayer = import("../packages/Layers/HeatmapLayer.vue");
    expect(HeatmapLayer).toBeDefined();
    const LineLayer = import("../packages/Layers/LineLayer.vue");
    expect(LineLayer).toBeDefined();
    const RasterLayer = import("../packages/Layers/RasterLayer.vue");
    expect(RasterLayer).toBeDefined();
    const SymbolLayer = import("../packages/Layers/SymbolLayer.vue");
    expect(SymbolLayer).toBeDefined();
  });
});
