import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VVectorSource from "../packages/Sources/VectorSource.vue";
import { defineComponent, reactive } from "vue";

test("mount vvectorsource component", async ({ accessToken }) => {
  const app = defineComponent({
    components: { VMap, VVectorSource },
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VVectorSource />
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
  expect(wrapper.find("VVectorSource")).toBeDefined();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});
