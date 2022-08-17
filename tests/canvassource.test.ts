import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VCanvasSource from "../packages/Sources/CanvasSource.vue";
import { defineComponent, nextTick, reactive } from "vue";

function createComponent(accessToken: string | undefined) {
  return defineComponent({
    components: { VMap, VCanvasSource },
    props: ["coordinates", "animate"],
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VCanvasSource id="test" :coordinates="props.coordinates" :animate="props.animate" />
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

test("mount vcanvassource component", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      coordinates: [],
      animate: false,
    },
  });
  expect(wrapper.exists()).toBe(true);
  expect(wrapper).toBeTruthy();
  await nextTick();
  wrapper.setProps({
    coordinates: [[120, 30]],
    animate: true,
  });
  await nextTick();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});

test("update vcanvassource animate", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      coordinates: [[120, 30]],
      animate: true,
    },
  });
  expect(wrapper.exists()).toBe(true);
  expect(wrapper).toBeTruthy();
  await nextTick();
  wrapper.setProps({
    coordinates: [[120, 30]],
    animate: false,
  });
  await nextTick();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});

test("update vcanvassource coordinates", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      coordinates: [],
      animate: true,
    },
  });
  await nextTick();
  wrapper.setProps({
    coordinates: [[120, 30]],
    animate: true,
  });
  await nextTick();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});

test("update vcanvassource when unmount", async () => {
  const wrapper = mount(VCanvasSource, {
    props: {
      id: "test",
      coordinates: [],
      animate: false,
    },
  });
  await nextTick();
  wrapper.unmount();
});
