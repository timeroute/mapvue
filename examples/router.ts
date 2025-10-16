import { createRouter, createWebHistory } from "vue-router";
import DemoLayout from "./layouts/DemoLayout.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("./views/Home.vue"),
    },
    {
      path: "/demo",
      component: DemoLayout,
      children: [
        {
          path: "/vmap/basic",
          name: "BasicVMap",
          component: () => import("./views/vmap/BasicMap.vue"),
        },
        {
          path: "/vmap/projection",
          name: "Projection",
          component: () => import("./views/vmap/Projection.vue"),
        },
        {
          path: "/vmap/comparemap",
          name: "CompareMap",
          component: () => import("./views/vmap/CompareMap.vue"),
        },
        {
          path: "/vmap/syncmap",
          name: "SyncMap",
          component: () => import("./views/vmap/SyncMap.vue"),
        },
        {
          path: "/vmap/flyzoom",
          name: "VMapFlyZoom",
          component: () => import("./views/vmap/FlyZoom.vue"),
        },
        {
          path: "/vfog/basic",
          name: "BasicFog",
          component: () => import("./views/vfog/Basic.vue"),
        },
        {
          path: "/vmarker/basic",
          name: "BasicMarker",
          component: () => import("./views/vmarker/BasicMarker.vue"),
        },
        {
          path: "/vmarker/withchart",
          name: "MarkerWithChart",
          component: () => import("./views/vmarker/WithChart.vue"),
        },
        {
          path: "/vpopup/basic",
          name: "VPopupBasic",
          component: () => import("./views/vpopup/Basic.vue"),
        },
        {
          path: "/vpopup/withchart",
          name: "VPopupWithChart",
          component: () => import("./views/vpopup/WithChart.vue"),
        },
        {
          path: "/vfeaturestate/basic",
          name: "VFeatureStateBasic",
          component: () => import("./views/vfeaturestate/Basic.vue"),
        },
        {
          path: "/vsprite/basic",
          name: "VSpriteBasic",
          component: () => import("./views/vsprite/Basic.vue"),
        },
        {
          path: "/vattributioncontrol/basic",
          name: "VAttributionControlBasic",
          component: () => import("./views/vattributioncontrol/Basic.vue"),
        },
        {
          path: "/vnavigationcontrol/basic",
          name: "VNavigationControlBasic",
          component: () => import("./views/vnavigationcontrol/Basic.vue"),
        },
        {
          path: "/vscalecontrol/basic",
          name: "VScaleControlBasic",
          component: () => import("./views/vscalecontrol/Basic.vue"),
        },
        {
          path: "/vsource/vgeosource/point",
          name: "GeoSourcePoint",
          component: () => import("./views/vsource/vgeosource/Point.vue"),
        },
        {
          path: "/vsource/vgeosource/line",
          name: "GeoSourceLine",
          component: () => import("./views/vsource/vgeosource/Line.vue"),
        },
        {
          path: "/vsource/vgeosource/polygon",
          name: "GeoSourcePolygon",
          component: () => import("./views/vsource/vgeosource/Polygon.vue"),
        },
        {
          path: "/vsource/vgeosource/cluster",
          name: "GeoSourceCluster",
          component: () => import("./views/cluster/Cluster.vue"),
        },
        {
          path: "/vsource/vrastersource/basic",
          name: "RasterSourceBasic",
          component: () => import("./views/vsource/vrastersource/Basic.vue"),
        },
        {
          path: "/vsource/vrasterdemsource/basic",
          name: "RasterDemSourceBasic",
          component: () => import("./views/vsource/vrasterdemsource/Basic.vue"),
        },
        {
          path: "/vsource/vimagesource/basic",
          name: "ImageSourceBasic",
          component: () => import("./views/vsource/vimagesource/Basic.vue"),
        },
        {
          path: "/vsource/vvideosource/basic",
          name: "VideoSourceBasic",
          component: () => import("./views/vsource/vvideosource/Basic.vue"),
        },
        {
          path: "/vsource/vcanvassource/basic",
          name: "CanvasSourceBasic",
          component: () => import("./views/vsource/vcanvassource/Basic.vue"),
        },
        {
          path: "/vsource/vvectorsource/basic",
          name: "VectorSourceBasic",
          component: () => import("./views/vsource/vvectorsource/Basic.vue"),
        },
        {
          path: "/vlayer/vbackgroundlayer/basic",
          name: "BackgroundLayerBasic",
          component: () => import("./views/vlayer/vbackgroundlayer/Basic.vue"),
        },
        {
          path: "/vlayer/vhillshadelayer/basic",
          name: "HillshadeLayerBasic",
          component: () => import("./views/vlayer/vhillshadelayer/Basic.vue"),
        },
        {
          path: "/vlayer/vfilllayer/basic",
          name: "FillLayerBasic",
          component: () => import("./views/vlayer/vfilllayer/Basic.vue"),
        },
        {
          path: "/vlayer/vfillextrusionlayer/basic",
          name: "FillExtrusionLayerBasic",
          component: () => import("./views/vlayer/vfillextrusionlayer/Basic.vue"),
        },
        {
          path: "/vlayer/vlinelayer/basic",
          name: "LineLayerBasic",
          component: () => import("./views/vlayer/vlinelayer/Basic.vue"),
        },
        {
          path: "/vlayer/vcirclelayer/basic",
          name: "CircleLayerBasic",
          component: () => import("./views/vlayer/vcirclelayer/Basic.vue"),
        },
        {
          path: "/vlayer/vheatmaplayer/basic",
          name: "HeatmapLayerBasic",
          component: () => import("./views/vlayer/vheatmaplayer/Basic.vue"),
        },
        {
          path: "/vlayer/vrasterlayer/basic",
          name: "RasterLayerBasic",
          component: () => import("./views/vlayer/vrasterlayer/Basic.vue"),
        },
        {
          path: "/vlayer/vsymbollayer/basic",
          name: "SymbolLayerBasic",
          component: () => import("./views/vlayer/vsymbollayer/Basic.vue"),
        },
        {
          path: "/vlayer/vskylayer/basic",
          name: "SkyLayerBasic",
          component: () => import("./views/vlayer/vskylayer/Basic.vue"),
        },
      ],
    },
  ],
});

export default router;
