import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VFillLayer from "../packages/Layers/FillLayer.vue";
import VGeoSource from "@/Sources/GeoSource.vue";
import { defineComponent, nextTick, reactive } from "vue";

function createComponent(accessToken: string | undefined) {
  return defineComponent({
    components: { VMap, VFillLayer, VGeoSource },
    props: ["sourceLayer", "paint", "layout", "minzoom", "maxzoom", "filter"],
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VGeoSource id="test" :data="state.data" />
        <VFillLayer id="test" source="test" :sourceLayer="props.sourceLayer" :paint="props.paint" :layout="props.layout" :minzoom="props.minzoom" :maxzoom="props.maxzoom" :filter="props.filter" />
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
            type: "Polygon",
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

test("mount vfilllayer component", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      paint: {
        "fill-color": "#f00",
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
      "fill-color": "#f00",
      "fill-opacity": 0.5,
    },
    layout: {
      visibility: "none",
    },
    minzoom: 2,
    maxzoom: 18,
  });
  await nextTick();
  expect(wrapper.vm.props.paint).toEqual({
    "fill-color": "#f00",
    "fill-opacity": 0.5,
  });
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});

test("update vfilllayer filter", async ({ accessToken }) => {
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
