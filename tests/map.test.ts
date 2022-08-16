import { test, expect, type Mock } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import { defineComponent, nextTick } from "vue";
import type { DefinedComponent } from "@vue/test-utils/dist/types";

function createComponent(
  accessToken: string | undefined,
  fn: Mock<unknown[], unknown> | undefined = undefined
): DefinedComponent {
  return defineComponent({
    components: { VMap },
    template: `
      <VMap :options="props.options" :accessToken="accessToken" @loaded="handleLoaded">
      </VMap>
    `,
    props: ["options"],
    setup(props) {
      return {
        props,
        accessToken,
        handleLoaded: fn,
      };
    },
  });
}

test("mount vmap component", async ({ accessToken }) => {
  expect(VMap).toBeTruthy();
  const handleLoaded = vi.fn();
  const app = createComponent(accessToken, handleLoaded);

  const wrapper = mount(app, {
    props: {
      options: {
        center: [120, 30],
      },
    },
  });
  expect(wrapper.exists()).toBe(true);

  wrapper.setProps({
    options: {
      center: [120, 30],
      zoom: 8,
      pitch: 20,
      bearing: 45,
      style: "mapbox://styles/mapbox/dark-v10",
      bounds: [0, 0, 80, 80],
      minZoom: 2,
      maxZoom: 10,
      maxBounds: [0, 0, 80, 80],
      maxPitch: 90,
      minPitch: 0,
    },
  });
  await nextTick();
  expect(wrapper.vm.props.options.zoom).toBe(8);
  expect(wrapper.vm.props.options.pitch).toBe(20);
  expect(wrapper.vm.props.options.bearing).toBe(45);
  expect(wrapper.vm.props.options.style).toBe(
    "mapbox://styles/mapbox/dark-v10"
  );
  expect(wrapper.vm.props.options.bounds).toEqual([0, 0, 80, 80]);
  expect(wrapper.vm.props.options.maxBounds).toEqual([0, 0, 80, 80]);
  expect(wrapper.vm.props.options.minZoom).toBe(2);
  expect(wrapper.vm.props.options.maxZoom).toBe(10);
  expect(wrapper.vm.props.options.maxPitch).toBe(90);
  expect(wrapper.vm.props.options.minPitch).toBe(0);
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
  expect(handleLoaded).toHaveBeenCalled();
  expect(handleLoaded).toBeCalledTimes(1);
});

test("update style", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      options: {
        center: [120, 30],
        style: "mapbox://styles/mapbox/dark-v10",
      },
    },
  });
  wrapper.setProps({
    options: {
      center: [120, 30],
      style: {
        version: 8,
        name: "custom",
        sources: {},
        layers: [
          {
            id: "bg",
            type: "background",
          },
        ],
      },
    },
  });
  await nextTick();
  expect(wrapper.vm.props.options.style).toBeTypeOf("object");
  wrapper.unmount();
});

test("update undefined center", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      options: {
        center: [120, 30],
        style: "mapbox://styles/mapbox/dark-v10",
      },
    },
  });
  wrapper.setProps({
    options: {
      center: undefined,
    },
  });
  await nextTick();
  expect(wrapper.vm.props.options.center).toBeUndefined();
  wrapper.unmount();
});

test("update undefined zoom", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      options: {
        center: [120, 30],
        zoom: 4,
      },
    },
  });
  wrapper.setProps({
    options: {
      zoom: undefined,
    },
  });
  await nextTick();
  expect(wrapper.vm.props.options.zoom).toBeUndefined();
  wrapper.unmount();
});

test("update undefined pitch", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      options: {
        center: [120, 30],
        pitch: 4,
      },
    },
  });
  wrapper.setProps({
    options: {
      pitch: undefined,
    },
  });
  await nextTick();
  expect(wrapper.vm.props.options.pitch).toBeUndefined();
  wrapper.unmount();
});

test("update undefined bearing", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      options: {
        center: [120, 30],
        bearing: 4,
      },
    },
  });
  wrapper.setProps({
    options: {
      bearing: undefined,
    },
  });
  await nextTick();
  expect(wrapper.vm.props.options.bearing).toBeUndefined();
  wrapper.unmount();
});

test("update undefined bounds", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      options: {
        center: [120, 30],
        bounds: [0, 0, 80, 80],
      },
    },
  });
  wrapper.setProps({
    options: {
      bounds: undefined,
    },
  });
  await nextTick();
  expect(wrapper.vm.props.options.bounds).toBeUndefined();
  wrapper.unmount();
});

test("update undefined maxBounds", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      options: {
        center: [120, 30],
        maxBounds: [0, 0, 80, 80],
      },
    },
  });
  wrapper.setProps({
    options: {
      maxBounds: undefined,
    },
  });
  await nextTick();
  expect(wrapper.vm.props.options.maxBounds).toBeUndefined();
  wrapper.unmount();
});

test("update undefined maxZoom", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      options: {
        center: [120, 30],
        maxZoom: 12,
      },
    },
  });
  wrapper.setProps({
    options: {
      maxZoom: undefined,
    },
  });
  await nextTick();
  expect(wrapper.vm.props.options.maxZoom).toBeUndefined();
  wrapper.unmount();
});

test("update undefined minZoom", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      options: {
        center: [120, 30],
        minZoom: 12,
      },
    },
  });
  wrapper.setProps({
    options: {
      minZoom: undefined,
    },
  });
  await nextTick();
  expect(wrapper.vm.props.options.minZoom).toBeUndefined();
  wrapper.unmount();
});

test("update undefined maxPitch", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      options: {
        center: [120, 30],
        maxPitch: 12,
      },
    },
  });
  wrapper.setProps({
    options: {
      maxPitch: undefined,
    },
  });
  await nextTick();
  expect(wrapper.vm.props.options.maxPitch).toBeUndefined();
  wrapper.unmount();
});

test("update undefined minPitch", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      options: {
        center: [120, 30],
        minPitch: 12,
      },
    },
  });
  wrapper.setProps({
    options: {
      minPitch: undefined,
    },
  });
  await nextTick();
  expect(wrapper.vm.props.options.minPitch).toBeUndefined();
  wrapper.unmount();
});
