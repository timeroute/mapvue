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
      paint: {
        "background-color": "#f00",
      },
      layout: {
        visibility: "visible",
      },
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
  expect(wrapper.vm.props.paint).toEqual({
    "background-color": "#f00",
    "background-opacity": 0.5,
  });
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});
