import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VImageSource from "../packages/Sources/ImageSource.vue";
import { defineComponent, nextTick, reactive } from "vue";

function createComponent(accessToken: string | undefined) {
  return defineComponent({
    components: { VMap, VImageSource },
    props: ["coordinates", "url"],
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VImageSource id="test" :coordinates="props.coordinates" :url="props.url" />
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
}

test("mount vimagesource component", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      coordinates: [],
      url: "",
    },
  });
  expect(wrapper.exists()).toBe(true);
  expect(wrapper).toBeTruthy();
  await nextTick();
  wrapper.setProps({
    coordinates: [[120, 30]],
    url: "http",
  });
  await nextTick();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});

test("update vimagesource coordinates", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      coordinates: [[120, 30]],
      url: "",
    },
  });
  await nextTick();
  wrapper.setProps({
    coordinates: [],
    url: "http",
  });
  await nextTick();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});

test("update vimagesource when unmount", async () => {
  const wrapper = mount(VImageSource, {
    props: {
      id: "test",
      coordinates: [],
      url: "",
    },
  });
  await nextTick();
  wrapper.setProps({
    id: "test",
    coordinates: [],
    url: "http",
  });
  await nextTick();
  wrapper.unmount();
});
