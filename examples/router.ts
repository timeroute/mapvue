import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("./views/Home.vue"),
    },
    {
      path: "/vmap/basic",
      name: "BasicVMap",
      component: () => import("./views/vmap/BasicMap.vue"),
    },
    {
      path: "/vmap/event",
      name: "VMapWithEvent",
      component: () => import("./views/vmap/WithEvent.vue"),
    },
    {
      path: "/vmarker/basic",
      name: "BasicMarker",
      component: () => import("./views/vmarker/BasicMarker.vue"),
    },
    {
      path: "/vpopup/basic",
      name: "VPopupBasic",
      component: () => import("./views/vpopup/Basic.vue"),
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
  ],
});

export default router;
