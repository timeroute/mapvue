import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VVideoSource from "../packages/Sources/VideoSource.vue";
import { defineComponent, nextTick, reactive } from "vue";

function createComponent(accessToken: string | undefined) {
  return defineComponent({
    components: { VMap, VVideoSource },
    props: ["coordinates", "urls", "playing"],
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VVideoSource id="test" :coordinates="props.coordinates" :urls="props.urls" :playing="props.playing" />
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

test("mount vvideosource component", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      coordinates: [],
      urls: [""],
    },
  });
  expect(wrapper.exists()).toBe(true);
  expect(wrapper).toBeTruthy();
  await nextTick();
  wrapper.setProps({
    coordinates: [[120, 30]],
    urls: ["http"],
  });
  await nextTick();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});

test("update vvideosource playing", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      coordinates: [[120, 30]],
      urls: ["http"],
    },
  });
  expect(wrapper.exists()).toBe(true);
  expect(wrapper).toBeTruthy();
  await nextTick();
  wrapper.setProps({
    coordinates: [[120, 30]],
    urls: ["http"],
    playing: true,
  });
  await nextTick();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});

test("update vvideosource pause", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      coordinates: [[120, 30]],
      urls: ["http"],
      playing: true,
    },
  });
  expect(wrapper.exists()).toBe(true);
  expect(wrapper).toBeTruthy();
  await nextTick();
  wrapper.setProps({
    coordinates: [[120, 30]],
    urls: ["http"],
    playing: false,
  });
  await nextTick();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});

test("update vvideosource coordinates", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      coordinates: [[120, 30]],
      urls: [""],
    },
  });
  await nextTick();
  wrapper.setProps({
    coordinates: [],
    urls: ["http"],
  });
  await nextTick();
  wrapper.unmount();
});

test("update vvideosource when unmount", async () => {
  const wrapper = mount(VVideoSource, {
    props: {
      id: "test",
      coordinates: [],
      urls: [""],
    },
  });
  await nextTick();
  wrapper.setProps({
    id: "test",
    coordinates: [],
    urls: ["http"],
  });
  await nextTick();
  wrapper.unmount();
});
