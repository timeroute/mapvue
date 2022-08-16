import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VFog from "../packages/Common/Fog.vue";
import { defineComponent, reactive } from "vue";

test("mount vfog component", async ({ accessToken }) => {
  const app = defineComponent({
    components: { VMap, VFog },
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VFog color="#f00" />
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
  expect(wrapper.find("VFog")).toBeDefined();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});
