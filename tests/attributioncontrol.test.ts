import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VAttributionControl from "../packages/Controls/AttributionControl.vue";
import { defineComponent, reactive } from "vue";

test("mount vattributioncontrol component", async ({ accessToken }) => {
  const app = defineComponent({
    components: { VMap, VAttributionControl },
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VAttributionControl />
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
  expect(wrapper.find("VAttributionControl")).toBeDefined();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});
