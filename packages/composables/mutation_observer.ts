import { onUnmounted, watch, type ComputedRef } from "vue";

export function useMutationObserver(
  dom: ComputedRef<HTMLElement | undefined>,
  options: MutationObserverInit | undefined,
  callback: MutationCallback
) {
  let observer: MutationObserver;

  const destroy = () => {
    if (!observer) return;
    observer.disconnect();
  };

  watch(dom, (dom) => {
    destroy();
    if (dom) {
      observer = new MutationObserver(callback);
      observer.observe(dom, options);
    }
  });

  onUnmounted(() => {
    destroy();
  });
}
