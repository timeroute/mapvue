import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VRasterDemSource from "../packages/Sources/RasterDemSource.vue";
import { defineComponent, reactive } from "vue";

test("mount vrasterdemsource component", async ({ accessToken }) => {
  const app = defineComponent({
    components: { VMap, VRasterDemSource },
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VRasterDemSource />
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
  expect(wrapper.find("VRasterDemSource")).toBeDefined();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});
