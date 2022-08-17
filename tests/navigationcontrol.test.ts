import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VNavigationControl from "../packages/Controls/NavigationControl.vue";
import { defineComponent, nextTick, reactive } from "vue";

test("mount vnavigationcontrol component", async ({ accessToken }) => {
  const app = defineComponent({
    components: { VMap, VNavigationControl },
    props: ["position", "showCompass", "showZoom", "visualizePitch"],
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VNavigationControl :position="props.position" :showCompass="props.showCompass" :showZoom="props.showZoom" :visualizePitch="props.visualizePitch" />
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
  expect(wrapper.find("VNavigationControl")).toBeDefined();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});

test("mount vnavigationcontrol when unmount", async () => {
  const wrapper = mount(VNavigationControl, {
    props: {
      position: "bottom-right",
      showCompass: true,
      showZoom: true,
      visualizePitch: true,
    },
  });
  wrapper.unmount();
});
