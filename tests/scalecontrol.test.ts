import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VScaleControl from "../packages/Controls/ScaleControl.vue";
import { defineComponent, reactive } from "vue";

test("mount vscalecontrol component", async ({ accessToken }) => {
  const app = defineComponent({
    components: { VMap, VScaleControl },
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VScaleControl />
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
  expect(wrapper.find("VScaleControl")).toBeDefined();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});
