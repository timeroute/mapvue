import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VRasterDemSource from "../packages/Sources/RasterDemSource.vue";
import { defineComponent, nextTick, reactive } from "vue";

function createComponent(accessToken: string | undefined) {
  return defineComponent({
    components: { VMap, VRasterDemSource },
    props: [
      "tiles",
      "url",
      "bounds",
      "tileSize",
      "attribution",
      "minzoom",
      "maxzoom",
      "exaggeration",
      "encoding",
      "volatile",
    ],
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VRasterDemSource 
          id="test"
          :tiles="props.tiles"
          :url="props.url"
          :bounds="props.bounds"
          :attribution="props.attribution"
          :tileSize="props.tileSize"
          :minzoom="props.minzoom"
          :maxzoom="props.maxzoom"
          :exaggeration="props.exaggeration"
          :encoding="props.encoding"
          :volatile="props.volatile"
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

test("mount vrasterdemsource component", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      tiles: ["http"],
      url: "http",
      exaggeration: 2,
      encoding: "mapbox",
    },
  });
  expect(wrapper.exists()).toBe(true);
  expect(wrapper).toBeTruthy();
  await nextTick();
  wrapper.setProps({
    tiles: ["http", "https"],
    url: "https",
    bounds: [0, 0, 50, 50],
    attribution: "test attrib",
    minzoom: 0,
    maxzoom: 15,
    tileSize: 512,
    exaggeration: 1,
    encoding: undefined,
  });
  await nextTick();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});

test("mount vrasterdemsource component with url", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      tiles: ["http", "https"],
    },
  });
  await nextTick();
  wrapper.unmount();
});

test("update vrasterdemsource when unmount", async () => {
  const wrapper = mount(VRasterDemSource, {
    props: {
      id: "test",
      url: "http",
    },
  });
  await nextTick();
  wrapper.unmount();
});
