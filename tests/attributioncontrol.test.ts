import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VAttributionControl from "../packages/Controls/AttributionControl.vue";
import { defineComponent, nextTick, reactive } from "vue";

test("mount vattributioncontrol component", async ({ accessToken }) => {
  const app = defineComponent({
    components: { VMap, VAttributionControl },
    props: ["position", "compact", "customAttribution"],
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VAttributionControl :position="props.position" :compact="props.compact" :customAttribution="props.customAttribution" />
      </VMap>
    `,
    setup(props) {
      const state = reactive({
        options: {
          center: [120, 30],
        },
      });

      return {
        props,
        state,
        accessToken,
      };
    },
  });
  const wrapper = mount(app, {
    props: {},
  });
  await nextTick();
  expect(wrapper.exists()).toBe(true);
  expect(wrapper).toBeTruthy();
  expect(wrapper.find("VAttributionControl")).toBeDefined();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});

test("mount vattributioncontrol when unmount", async () => {
  const wrapper = mount(VAttributionControl, {
    props: {
      position: "bottom-right",
      compact: false,
      customAttribution: "test",
    },
  });
  wrapper.unmount();
});
