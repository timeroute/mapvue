import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VSymbolLayer from "../packages/Layers/SymbolLayer.vue";
import { defineComponent, reactive } from "vue";

test("mount vsymbollayer component", async ({ accessToken }) => {
  const app = defineComponent({
    components: { VMap, VSymbolLayer },
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VSymbolLayer />
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
  expect(wrapper.find("VSymbolSource")).toBeDefined();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});
