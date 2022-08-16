import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VRasterLayer from "../packages/Layers/RasterLayer.vue";
import VGeoSource from "@/Sources/GeoSource.vue";
import { defineComponent, nextTick, reactive } from "vue";

function createComponent(accessToken: string | undefined) {
  return defineComponent({
    components: { VMap, VRasterLayer, VGeoSource },
    props: ["sourceLayer", "paint", "layout", "minzoom", "maxzoom", "filter"],
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VGeoSource id="test" :data="state.data" />
        <VRasterLayer id="test" source="test" :sourceLayer="props.sourceLayer" :paint="props.paint" :layout="props.layout" :minzoom="props.minzoom" :maxzoom="props.maxzoom" :filter="props.filter" />
      </VMap>
    `,
    setup(props) {
      const state = reactive({
        options: {
          center: [120, 30],
        },
        data: {
          type: "Feature",
          geometry: {
            type: "RasterString",
            coordinates: [],
          },
        },
      });

      return {
        props,
        state,
        accessToken,
      };
    },
  });
}

test("mount vrasterlayer component", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      paint: {
        "raster-const": 0,
      },
      layout: {
        visibility: "visible",
      },
      sourceLayer: "water",
      minzoom: 0,
      maxzoom: 20,
    },
  });
  await nextTick();
  expect(wrapper.exists()).toBe(true);
  expect(wrapper).toBeTruthy();
  wrapper.setProps({
    paint: {
      "raster-const": 0,
      "raster-width": 4,
    },
    layout: {
      visibility: "none",
    },
    minzoom: 2,
    maxzoom: 18,
  });
  await nextTick();
  expect(wrapper.vm.props.paint).toEqual({
    "raster-const": 0,
    "raster-width": 4,
  });
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});

test("update vrasterlayer filter", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      filter: ["==", ["get", "key"], 0],
    },
  });
  await nextTick();
  wrapper.setProps({
    filter: ["==", ["get", "value"], 0],
  });
  await nextTick();
  expect(wrapper.vm.props.filter).toEqual(["==", ["get", "value"], 0]);
  wrapper.unmount();
});

test("update vrasterlayer maxzoom", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      minzoom: 0,
      maxzoom: 20,
    },
  });
  await nextTick();
  wrapper.setProps({
    minzoom: 0,
    maxzoom: undefined,
  });
  await nextTick();
  wrapper.unmount();
});

test("update vrasterlayer minzoom", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      minzoom: 0,
      maxzoom: 20,
    },
  });
  await nextTick();
  wrapper.setProps({
    minzoom: undefined,
    maxzoom: 20,
  });
  await nextTick();
  wrapper.unmount();
});

test("update vrasterlayer when unmount", async () => {
  const wrapper = mount(VRasterLayer, {
    props: {
      id: "test",
      source: "test",
      minzoom: 0,
      maxzoom: 20,
    },
  });
  await nextTick();
  wrapper.setProps({
    id: "test",
    source: "test",
    minzoom: 2,
    maxzoom: 18,
    paint: {
      "raster-const": 0,
      "raster-opacity": 0.5,
    },
    layout: {
      visibility: "none",
    },
    filter: ["==", ["get", "value"], 0],
  });
  await nextTick();
  wrapper.unmount();
});
