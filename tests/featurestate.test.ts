import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VFeatureState from "../packages/Common/FeatureState.vue";
import { defineComponent, nextTick, reactive } from "vue";

test("mount vfeaturestate component", async ({ accessToken }) => {
  const app = defineComponent({
    components: { VMap, VFeatureState },
    props: ["feature", "fstate"],
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VFeatureState :feature="props.feature" :state="props.fstate" />
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
    props: {
      feature: {
        id: "test",
        source: "test",
      },
      fstate: {
        hover: true,
      },
    },
  });
  await nextTick();
  expect(wrapper.exists()).toBe(true);
  expect(wrapper).toBeTruthy();
  expect(wrapper.findComponent("VFeatureState")).toBeDefined();
  wrapper.setProps({
    feature: {
      source: "test2",
    },
    fstate: {
      hover: false,
    },
  });
  await nextTick();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});

test("update vfeaturestate when unmount", async () => {
  const wrapper = mount(VFeatureState, {
    props: {
      feature: {
        id: "test2",
        source: "test2",
      },
      state: {
        hover: false,
      },
    },
  });
  await nextTick();
  wrapper.unmount();
});
