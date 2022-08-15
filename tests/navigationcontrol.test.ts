import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VNavigationControl from "../packages/Controls/NavigationControl.vue";
import { defineComponent, reactive } from "vue";

test("mount vnavigationcontrol component", async ({ accessToken }) => {
  const app = defineComponent({
    components: { VMap, VNavigationControl },
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VNavigationControl />
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
  expect(wrapper.find("VNavigationControl")).toBeDefined();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});
