import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VRasterLayer from "../packages/Layers/RasterLayer.vue";
import { defineComponent, reactive } from "vue";

test("mount vrasterlayer component", async ({ accessToken }) => {
  const app = defineComponent({
    components: { VMap, VRasterLayer },
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VRasterLayer />
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
  expect(wrapper.find("VRasterSource")).toBeDefined();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});
