import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VGeoSource from "../packages/Sources/GeoSource.vue";
import { defineComponent, nextTick, reactive } from "vue";

function createComponent(accessToken) {
  return defineComponent({
    components: { VMap, VGeoSource },
    props: [
      "data",
      "buffer",
      "generateId",
      "attribution",
      "cluster",
      "clusterMaxZoom",
      "clusterMinPoints",
      "clusterProperties",
      "clusterRadius",
      "filter",
      "protomteId",
      "lineMetrics",
      "maxzoom",
      "tolerance",
    ],
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VGeoSource 
          id="test"
          :data="props.data"
          :buffer="props.buffer"
          :generateId="props.generateId"
          :attribution="props.attribution"
          :cluster="props.cluster"
          :clusterMaxZoom="props.clusterMaxZoom"
          :clusterMinPoints="props.clusterMinPoints"
          :clusterProperties="props.clusterProperties"
          :clusterRadius="props.clusterRadius"
          :filter="props.filter"
          :protomteId="props.protomteId"
          :lineMetrics="props.lineMetrics"
          :maxzoom="props.maxzoom"
          :tolerance="props.tolerance"
        />
      </VMap>
    `,
    setup(props) {
      const state = reactive({
        options: {
          center: [120, 30],
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

test("mount vgeosource component", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      data: {
        type: "FeatureCollection",
        features: [],
      },
      buffer: 32,
      generateId: true,
      attribution: "test",
      cluster: true,
      clusterMaxZoom: 5,
      clusterMinPoints: 10,
      clusterProperties: { sum: ["+", ["get", "scalerank"]] },
      clusterRadius: 1,
      filter: ["==", ["get", "value"], 4],
      protomteId: true,
      lineMetrics: true,
      maxzoom: 10,
      tolerance: 0.75,
    },
  });
  expect(wrapper.exists()).toBe(true);
  expect(wrapper).toBeTruthy();
  expect(wrapper.find("VGeoSource")).toBeDefined();
  await nextTick();
  wrapper.setProps({
    data: {
      type: "FeatureCollection",
      features: [],
    },
    buffer: 64,
    generateId: false,
    attribution: "test attrib",
    cluster: false,
    filter: ["==", ["get", "value"], 2],
    protomteId: false,
    lineMetrics: false,
    maxzoom: 20,
    tolerance: 1,
  });
  await nextTick();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});

test("update vgeosource when unmount", async () => {
  const wrapper = mount(VGeoSource, {
    props: {
      id: "test",
      data: {
        type: "FeatureCollection",
        features: [],
      },
    },
  });
  await nextTick();
  wrapper.unmount();
});
