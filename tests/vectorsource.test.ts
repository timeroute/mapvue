import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VVectorSource from "../packages/Sources/VectorSource.vue";
import { defineComponent, nextTick, reactive } from "vue";

function createComponent(accessToken: string | undefined) {
  return defineComponent({
    components: { VMap, VVectorSource },
    props: [
      "tiles",
      "url",
      "promoteId",
      "scheme",
      "bounds",
      "attribution",
      "minzoom",
      "maxzoom",
    ],
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VVectorSource 
          id="test"
          :tiles="props.tiles"
          :url="props.url"
          :scheme="props.scheme"
          :bounds="props.bounds"
          :attribution="props.attribution"
          :promoteId="props.promoteId"
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

test("mount vvectorsource component", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      tiles: ["http"],
      url: "http",
      promoteId: { key: "value" },
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
    promoteId: { key: "value" },
  });
  await nextTick();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});

test("update vvectorsource tiles", async ({ accessToken }) => {
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

test("mount vvectorsource component with url", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      tiles: ["http", "https"],
    },
  });
  await nextTick();
  wrapper.unmount();
});

test("update vvectorsource when unmount", async () => {
  const wrapper = mount(VVectorSource, {
    props: {
      id: "test",
      url: "http",
    },
  });
  await nextTick();
  wrapper.unmount();
});
