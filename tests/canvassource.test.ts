import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VCanvasSource from "../packages/Sources/CanvasSource.vue";
import { defineComponent, reactive } from "vue";

test("mount vcanvassource component", async ({ accessToken }) => {
  const app = defineComponent({
    components: { VMap, VCanvasSource },
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VCanvasSource />
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
  expect(wrapper.find("VCanvasSource")).toBeDefined();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});
