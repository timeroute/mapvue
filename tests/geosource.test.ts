import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VGeoSource from "../packages/Sources/GeoSource.vue";
import { defineComponent, reactive } from "vue";

test("mount vgeosource component", async ({ accessToken }) => {
  const app = defineComponent({
    components: { VMap, VGeoSource },
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VGeoSource />
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
  expect(wrapper.find("VGeoSource")).toBeDefined();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});
