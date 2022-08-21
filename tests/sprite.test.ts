import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VSprite from "../packages/Common/Sprite.vue";
import { defineComponent, nextTick, reactive } from "vue";

function createComponent(accessToken: string | undefined) {
  return defineComponent({
    components: { VMap, VSprite },
    props: ["name", "url"],
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VSprite :name="props.name" :url="props.url" />
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

test("mount vsprite component", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      url: "http",
      name: "test1",
    },
  });
  expect(wrapper.exists()).toBe(true);
  expect(wrapper).toBeTruthy();
  expect(wrapper.find("VSprite")).toBeDefined();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});

test("update vsprite url", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      url: "http",
      name: "test1",
    },
  });
  await nextTick();
  wrapper.setProps({
    url: "https",
    name: "test1",
  });
  await nextTick();
  wrapper.unmount();
});

test("update vsprite image", async ({ accessToken }) => {
  const image = new Image();
  image.src = "data:image/png;base64,iVBORw0K...";
  const wrapper = mount(createComponent(accessToken), {
    props: {
      url: image,
      name: "test1",
    },
  });
  await nextTick();
  const image2 = new Image();
  image2.src = "data:image/png;base64,asdfasdfasdf...";
  wrapper.setProps({
    url: image2,
    name: "test1",
  });
  await nextTick();
  wrapper.unmount();
});

test("update vsprite name", async ({ accessToken }) => {
  const wrapper = mount(createComponent(accessToken), {
    props: {
      url: "http",
      name: "test1",
    },
  });
  await nextTick();
  wrapper.setProps({
    url: "http",
    name: "test2",
  });
  await nextTick();
  wrapper.unmount();
});

test("mount vsprite when unmount", async () => {
  const wrapper = mount(VSprite, {
    props: {
      url: "http",
      name: "test1",
    },
  });
  wrapper.unmount();
});
