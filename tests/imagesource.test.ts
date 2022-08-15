import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VImageSource from "../packages/Sources/ImageSource.vue";
import { defineComponent, reactive } from "vue";

test("mount vimagesource component", async ({ accessToken }) => {
  const app = defineComponent({
    components: { VMap, VImageSource },
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VImageSource />
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
  expect(wrapper.find("VImageSource")).toBeDefined();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});
