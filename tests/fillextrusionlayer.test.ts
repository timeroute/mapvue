import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VFillExtrusionLayer from "../packages/Layers/FillExtrusionLayer.vue";
import { defineComponent, reactive } from "vue";

test("mount vfillextrusionlayer component", async ({ accessToken }) => {
  const app = defineComponent({
    components: { VMap, VFillExtrusionLayer },
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VFillExtrusionLayer />
      </VMap>
    `,
    setup() {
      const state = reactive({
        options: {
          center: [120, 30],
        },
      });

      return {
        state,
        accessToken,
      };
    },
  });
  const wrapper = mount(app);
  expect(wrapper.exists()).toBe(true);
  expect(wrapper).toBeTruthy();
  expect(wrapper.find("VFillExtrusionSource")).toBeDefined();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});
