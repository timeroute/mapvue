import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VScaleControl from "../packages/Controls/ScaleControl.vue";
import { defineComponent, nextTick, reactive } from "vue";

test("mount vscalecontrol component", async ({ accessToken }) => {
  const app = defineComponent({
    components: { VMap, VScaleControl },
    props: ["position", "maxWidth", "unit"],
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VScaleControl :position="props.position" :maxWidth="props.maxWidth" :unit="props.unit" />
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
  const wrapper = mount(app, {
    props: {},
  });
  await nextTick();
  expect(wrapper.exists()).toBe(true);
  expect(wrapper).toBeTruthy();
  expect(wrapper.find("VScaleControl")).toBeDefined();
  wrapper.setProps({
    unit: "nautical",
  });
  await nextTick();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});

test("mount vscalecontrol when unmount", async () => {
  const wrapper = mount(VScaleControl, {
    props: {
      position: "bottom-right",
      maxWidth: 300,
      unit: "metric",
    },
  });
  wrapper.unmount();
});
