import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VSkyLayer from "../packages/Layers/SkyLayer.vue";
import { defineComponent, nextTick, reactive } from "vue";

function createComponent(accessToken: string | undefined) {
  return defineComponent({
    components: { VMap, VSkyLayer },
    props: ["paint", "layout"],
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VSkyLayer id="test" :paint="props.paint" :layout="props.layout" />
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

test("mount vskylayer component", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      paint: {
        "sky-type": "atmosphere",
        "sky-atmosphere-color": "white",
      },
      layout: {
        visibility: "visible",
      },
    },
  });
  await nextTick();
  expect(wrapper.exists()).toBe(true);
  expect(wrapper).toBeTruthy();
  wrapper.setProps({
    paint: {
      "sky-type": "atmosphere",
      "sky-atmosphere-color": "red",
    },
    layout: {
      visibility: "none",
    },
    minzoom: 2,
    maxzoom: 18,
  });
  await nextTick();
  expect(wrapper.vm.props.paint).toEqual({
    "sky-type": "atmosphere",
    "sky-atmosphere-color": "red",
  });
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});

test("update vskylayer maxzoom", async ({ accessToken }) => {
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

test("update vskylayer when unmount", async () => {
  const wrapper = mount(VSkyLayer, {
    props: {
      id: "test",
    },
  });
  await nextTick();
  wrapper.setProps({
    id: "test",
    paint: {
      "sky-type": "atmosphere",
      "sky-atmosphere-color": "red",
    },
    layout: {
      visibility: "none",
    },
  });
  await nextTick();
  wrapper.unmount();
});
