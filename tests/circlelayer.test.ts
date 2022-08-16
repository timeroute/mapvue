import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VCircleLayer from "../packages/Layers/CircleLayer.vue";
import VGeoSource from "@/Sources/GeoSource.vue";
import { defineComponent, nextTick, reactive } from "vue";

function createComponent(accessToken: string | undefined) {
  return defineComponent({
    components: { VMap, VCircleLayer, VGeoSource },
    props: ["sourceLayer", "paint", "layout", "minzoom", "maxzoom", "filter"],
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VGeoSource id="test" :data="state.data" />
        <VCircleLayer id="test" source="test" :sourceLayer="props.sourceLayer" :paint="props.paint" :layout="props.layout" :minzoom="props.minzoom" :maxzoom="props.maxzoom" :filter="props.filter" />
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
            type: "Point",
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

test("mount vcirclelayer component", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      paint: {
        "circle-color": "#f00",
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
      "circle-color": "#f00",
      "circle-opacity": 0.5,
    },
    layout: {
      visibility: "none",
    },
    minzoom: 2,
    maxzoom: 18,
  });
  await nextTick();
  expect(wrapper.vm.props.paint).toEqual({
    "circle-color": "#f00",
    "circle-opacity": 0.5,
  });
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});

test("update vcirclelayer filter", async ({ accessToken }) => {
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

test("update vcirclelayer maxzoom", async ({ accessToken }) => {
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

test("update vcirclelayer minzoom", async ({ accessToken }) => {
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

test("update vcirclelayer when unmount", async () => {
  const wrapper = mount(VCircleLayer, {
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
      "circle-color": "#f00",
      "circle-opacity": 0.5,
    },
    layout: {
      visibility: "none",
    },
    filter: ["==", ["get", "value"], 0],
  });
  await nextTick();
  wrapper.unmount();
});
