import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VFog from "../packages/Common/Fog.vue";
import { defineComponent, nextTick, reactive } from "vue";

function createComponent(accessToken: string | undefined) {
  return defineComponent({
    components: { VMap, VFog },
    props: [
      "color",
      "high-color",
      "space-color",
      "range",
      "star-intensity",
      "horizon-blend",
    ],
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VFog
          :color="props.color"
          :range="props.range"
          :high-color="props['high-color']"
          :space-color="props['space-color']"
          :horizon-blend="props['horizon-blend']"
          :star-intensity="props['star-intensity']"
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

test("mount vfog component", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken));
  await nextTick();
  expect(wrapper.exists()).toBe(true);
  expect(wrapper).toBeTruthy();
  expect(wrapper.findComponent("VFog")).toBeDefined();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});

test("update vfog color", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      color: "#f00",
    },
  });
  await nextTick();
  wrapper.setProps({
    color: "#f0f",
  });
  await nextTick();
  wrapper.unmount();
});

test("update vfog horizon-blend", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {},
  });
  await nextTick();
  wrapper.setProps({
    "horizon-blend": 1,
  });
  await nextTick();
  wrapper.unmount();
});

test("update vfog range", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      color: "#f00",
      "high-color": "#f00",
      "space-color": "#f00",
      range: [1, 10],
      "star-intensity": 2,
      "horizon-blend": 2,
    },
  });
  await nextTick();
  wrapper.setProps({
    color: "#f0f",
    "high-color": "#f0f",
    "space-color": "#f0f",
    range: [1, 20],
    "star-intensity": 1,
    "horizon-blend": 1,
  });
  await nextTick();
  wrapper.unmount();
});

test("update vfog when unmount", async () => {
  const wrapper = mount(VFog, {
    props: {
      color: "#f00",
      "high-color": "#f00",
    },
  });
  await nextTick();
  wrapper.unmount();
});
