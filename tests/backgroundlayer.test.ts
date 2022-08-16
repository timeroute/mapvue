import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VBackgroundLayer from "../packages/Layers/BackgroundLayer.vue";
import { defineComponent, nextTick, reactive } from "vue";

function createComponent(accessToken: string | undefined) {
  return defineComponent({
    components: { VMap, VBackgroundLayer },
    props: ["sourceLayer", "paint", "layout"],
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VBackgroundLayer id="test" :sourceLayer="props.sourceLayer" :paint="props.paint" :layout="props.layout" />
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

test("mount vbackgroundlayer component", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      sourceLayer: "water",
    },
  });
  await nextTick();
  expect(wrapper.exists()).toBe(true);
  expect(wrapper).toBeTruthy();
  wrapper.setProps({
    paint: {
      "background-color": "#f00",
      "background-opacity": 0.5,
    },
    layout: {
      visibility: "none",
    },
  });
  await nextTick();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});

test("update vbackgroundlayer when unmount", async () => {
  const wrapper = mount(VBackgroundLayer, {
    props: {
      id: "test",
      minzoom: 0,
      maxzoom: 20,
    },
  });
  await nextTick();
  wrapper.setProps({
    id: "test",
    minzoom: 2,
    maxzoom: 18,
    paint: {
      "background-color": "#f00",
      "background-opacity": 0.5,
    },
    layout: {
      visibility: "none",
    },
    filter: ["==", ["get", "value"], 0],
  });
  await nextTick();
  wrapper.unmount();
});
