import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VRasterSource from "../packages/Sources/RasterSource.vue";
import { defineComponent, nextTick, reactive } from "vue";

function createComponent(accessToken: string | undefined) {
  return defineComponent({
    components: { VMap, VRasterSource },
    props: [
      "tiles",
      "url",
      "scheme",
      "bounds",
      "tileSize",
      "attribution",
      "minzoom",
      "maxzoom",
    ],
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VRasterSource 
          id="test"
          :tiles="props.tiles"
          :url="props.url"
          :scheme="props.scheme"
          :bounds="props.bounds"
          :attribution="props.attribution"
          :tileSize="props.tileSize"
          :minzoom="props.minzoom"
          :maxzoom="props.maxzoom"
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

test("mount vrastersource component", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      tiles: ["http"],
      url: "http",
    },
  });
  expect(wrapper.exists()).toBe(true);
  expect(wrapper).toBeTruthy();
  await nextTick();
  wrapper.setProps({
    tiles: ["http", "https"],
    url: "https",
    scheme: "xyz",
    bounds: [0, 0, 50, 50],
    attribution: "test attrib",
    minzoom: 0,
    maxzoom: 15,
    tileSize: 512,
  });
  await nextTick();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});

test("update vrastersource tiles", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      tiles: ["http", "https"],
    },
  });
  await nextTick();
  wrapper.setProps({
    tiles: ["http"],
  });
  await nextTick();
  wrapper.unmount();
});

test("mount vrastersource component with url", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      tiles: ["http", "https"],
    },
  });
  await nextTick();
  wrapper.unmount();
});

test("update vrastersource when unmount", async () => {
  const wrapper = mount(VRasterSource, {
    props: {
      id: "test",
      url: "http",
    },
  });
  await nextTick();
  wrapper.unmount();
});
