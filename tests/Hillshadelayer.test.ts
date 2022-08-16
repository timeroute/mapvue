import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VHillshadeLayer from "../packages/Layers/HillshadeLayer.vue";
import { defineComponent, reactive } from "vue";

test("mount vhillshadelayer component", async ({ accessToken }) => {
  const app = defineComponent({
    components: { VMap, VHillshadeLayer },
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VHillshadeLayer />
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
  expect(wrapper.find("VHillshadeSource")).toBeDefined();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});
