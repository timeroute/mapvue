import { onBeforeUnmount, watch, type ComputedRef } from "vue";

export function useEventListener(
  dom: ComputedRef<HTMLElement | undefined>,
  event: string,
  callback: (ev: Event) => void
) {
  const destroy = () => {
    if (dom.value) {
      dom.value.removeEventListener(event, callback);
    }
  };

  watch(dom, (dom) => {
    destroy();
    if (dom) {
      dom.addEventListener(event, callback);
    }
  });

  onBeforeUnmount(() => {
    destroy();
  });
}
