import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VMap from "../packages/Map.vue";
import VPopup from "../packages/Common/Popup.vue";
import { defineComponent, nextTick, type DefineComponent } from "vue";

function createComponent(accessToken: string | undefined): DefineComponent {
  return defineComponent({
    components: { VMap, VPopup },
    props: ["options", "visible", "content", "popupOptions"],
    template: `
      <VMap :options="props.options" :accessToken="accessToken">
        <VPopup :center="props.options.center" :visible="props.visible" :options="props.popupOptions">
          {{props.content}}
        </VPopup>
      </VMap>
    `,
    setup(props) {
      return {
        props,
        accessToken,
      };
    },
  });
}

test("mount vpopup component", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      options: {
        center: [120, 30],
      },
      content: "test",
      visible: true,
    },
  });
  expect(wrapper.exists()).toBe(true);
  expect(wrapper).toBeTruthy();
  expect(wrapper.find("VPopup")).toBeDefined();
  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
});

test("vpopup update visible", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      options: {
        center: [120, 30],
      },
      content: "test",
      visible: true,
    },
  });
  wrapper.setProps({
    options: {
      center: [120, 30],
    },
    content: "test",
    visible: false,
  });
  await nextTick();
  wrapper.setProps({
    options: {
      center: [120, 30],
    },
    content: "test",
    visible: true,
  });
  await nextTick();
  wrapper.unmount();
});

test("vpopup update content", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      options: {
        center: [120, 30],
      },
      content: "test",
      visible: true,
    },
  });
  await nextTick();
  wrapper.setProps({
    options: {
      center: [120, 30],
    },
    content: "test222",
    visible: true,
  });
  await nextTick();
  wrapper.unmount();
});

test("vpopup update center", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      options: {
        center: [120, 30],
      },
      content: "test",
      visible: true,
    },
  });
  await nextTick();
  wrapper.setProps({
    options: {
      center: undefined,
    },
    content: "test",
    visible: true,
  });
  await nextTick();
  wrapper.unmount();
});

test("vpopup update anchor", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      options: {
        center: [120, 30],
      },
      content: "test",
      visible: true,
      popupOptions: undefined,
    },
  });
  await nextTick();
  wrapper.setProps({
    options: {
      center: [120, 30],
    },
    content: "test",
    visible: true,
    popupOptions: {
      anchor: "bottom-left",
    },
  });
  await nextTick();
  wrapper.unmount();
});

test("vpopup update offset", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      options: {
        center: [120, 30],
      },
      content: "test",
      visible: true,
      popupOptions: undefined,
    },
  });
  await nextTick();
  wrapper.setProps({
    options: {
      center: [120, 30],
    },
    content: "test",
    visible: true,
    popupOptions: {
      offset: 25,
    },
  });
  await nextTick();
  wrapper.unmount();
});

test("vpopup update maxWidth", async ({ accessToken }) => {
  const app = createComponent(accessToken);
  const wrapper = mount(app, {
    props: {
      options: {
        center: [120, 30],
      },
      content: "test",
      visible: true,
      popupOptions: {
        maxWidth: "200px",
      },
    },
  });
  await nextTick();
  wrapper.setProps({
    options: {
      center: [120, 30],
    },
    content: "test",
    visible: true,
    popupOptions: {
      maxWidth: "400px",
    },
  });
  await nextTick();
  wrapper.unmount();
});
