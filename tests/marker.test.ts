import { defineComponent, nextTick, reactive, type DefineComponent } from "vue";
import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VMarker from "../packages/Common/Marker.vue";

function createComponent(accessToken?: string): DefineComponent {
  return defineComponent({
    components: { VMap, VMarker },
    props: ["center", "options"],
    template: `
      <VMap :options="state.options" :accessToken="accessToken">
        <VMarker :center="props.center" :options="props.options">
          {{props.content}}
        </VMarker>
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

test("mount vmarker component", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      center: [120, 30],
      options: {},
    },
  });
  await nextTick();
  expect(wrapper.exists()).toBe(true);
  expect(wrapper).toBeTruthy();
  wrapper.setProps({
    center: [120, 30],
    options: {
      scale: 2,
      color: "#fff",
      anchor: "bottom-left",
      rotation: 90,
    },
  });
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});

test("vmarker update content", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      center: [120, 30],
      options: {
        scale: 2,
      },
    },
  });
  await nextTick();
  wrapper.setProps({
    center: [120, 30],
    content: "test",
    options: {
      scale: 2,
    },
  });
  await nextTick();
  wrapper.unmount();
});

test("vmarker update center", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      center: [120, 30],
      options: {
        scale: 2,
      },
    },
  });
  await nextTick();
  wrapper.setProps({
    center: [120, 31],
    options: {
      scale: 2,
    },
  });
  await nextTick();
  wrapper.unmount();
});

test("vmarker update center to undefined", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      center: [120, 30],
      options: {
        scale: 2,
      },
    },
  });
  await nextTick();
  wrapper.setProps({
    center: undefined,
    options: {
      scale: 2,
    },
  });
  await nextTick();
  wrapper.unmount();
});

test("vmarker update anchor", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      center: [120, 31],
    },
  });
  await nextTick();
  wrapper.setProps({
    center: [120, 31],
    options: {
      anchor: "bottom-left",
    },
  });
  await nextTick();
  wrapper.unmount();
});

test("vmarker update draggable", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      center: [120, 31],
    },
  });
  await nextTick();
  wrapper.setProps({
    center: [120, 31],
    options: {
      draggable: true,
    },
  });
  await nextTick();
  wrapper.unmount();
});

test("vmarker update scale", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      center: [120, 31],
    },
  });
  await nextTick();
  wrapper.setProps({
    center: [120, 31],
    options: {
      scale: 2,
    },
  });
  await nextTick();
  wrapper.unmount();
});

test("vmarker update color", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      center: [120, 31],
    },
  });
  await nextTick();
  wrapper.setProps({
    center: [120, 31],
    options: {
      color: "#f00",
    },
  });
  await nextTick();
  wrapper.unmount();
});

test("vmarker update rotationAlignment", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      center: [120, 31],
    },
  });
  await nextTick();
  wrapper.setProps({
    center: [120, 31],
    options: {
      rotationAlignment: "map",
    },
  });
  await nextTick();
  wrapper.unmount();
});

test("vmarker update pitchAlignment", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      center: [120, 31],
    },
  });
  await nextTick();
  wrapper.setProps({
    center: [120, 31],
    options: {
      pitchAlignment: "map",
    },
  });
  await nextTick();
  wrapper.unmount();
});

test("vmarker update rotation", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      center: [120, 31],
    },
  });
  await nextTick();
  wrapper.setProps({
    center: [120, 31],
    options: {
      rotation: 20,
    },
  });
  await nextTick();
  wrapper.unmount();
});

test("vmarker update offset", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      center: [120, 30],
      options: undefined,
    },
  });
  await nextTick();
  wrapper.setProps({
    center: [120, 30],
    options: {
      offset: 25,
    },
  });
  await nextTick();
  wrapper.unmount();
});

test("vmarker update center when undefined", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      center: [120, 30],
    },
  });
  await nextTick();
  wrapper.setProps({});
  await nextTick();
  wrapper.unmount();
});

test("vmarker unmount", async () => {
  const wrapper = mount(VMarker, {
    props: {
      center: [120, 30],
    },
  });
  await nextTick();
  wrapper.setProps({
    center: [120, 31],
  });
  await nextTick();
  wrapper.unmount();
});
