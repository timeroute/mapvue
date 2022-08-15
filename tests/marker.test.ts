import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VMarker from "../packages/Common/Marker.vue";
import VPopup from "../packages/Common/Popup.vue";
import { defineComponent, reactive } from "vue";

test("mount vmarker component", async ({ accessToken }) => {
  const app = defineComponent({
    components: { VMap, VMarker, VPopup },
    template: `
      <v-map :options="state.options" :accessToken="accessToken">
        <v-marker :center="[120, 30]" />
        <v-popup :center="[120, 30]" :visible="true">
          {{props.content}}
        </v-popup>
      </v-map>
    `,
    setup() {
      const state = reactive({
        options: {
          center: [120, 30],
          content: "test",
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
  expect(wrapper.find("VMarker")).toBeDefined();
  wrapper.setProps({
    center: [120, 30],
    content: "test1",
  });
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});
