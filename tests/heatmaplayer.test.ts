import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VHeatmapLayer from "../packages/Layers/HeatmapLayer.vue";
import { defineComponent, reactive } from "vue";

test("mount vheatmaplayer component", async ({ accessToken }) => {
  const app = defineComponent({
    components: { VMap, VHeatmapLayer },
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VHeatmapLayer />
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
  expect(wrapper.find("VHeatmapSource")).toBeDefined();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});
