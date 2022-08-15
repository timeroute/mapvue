import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VFeatureState from "../packages/Common/FeatureState.vue";
import { defineComponent, reactive } from "vue";

test("mount vfeaturestate component", async ({ accessToken }) => {
  const app = defineComponent({
    components: { VMap, VFeatureState },
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VFeatureState :feature="state.feature" />
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
  expect(wrapper.findComponent("VFeatureState")).toBeDefined();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});
