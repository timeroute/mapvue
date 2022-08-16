import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VSprite from "../packages/Common/Sprite.vue";
import { defineComponent, reactive } from "vue";

test("mount vsprite component", async ({ accessToken }) => {
  const app = defineComponent({
    components: { VMap, VSprite },
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VSprite name="testicon" url="http://test.com/test.png" />
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
  expect(wrapper.find("VSprite")).toBeDefined();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});
