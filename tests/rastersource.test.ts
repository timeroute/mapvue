import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VRasterSource from "../packages/Sources/RasterSource.vue";
import { defineComponent, reactive } from "vue";

test("mount vrastersource component", async ({ accessToken }) => {
  const app = defineComponent({
    components: { VMap, VRasterSource },
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VRasterSource />
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
