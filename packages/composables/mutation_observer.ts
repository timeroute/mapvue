import { onUnmounted, watch, type ComputedRef } from "vue";

export function useMutationObserver(
  dom: ComputedRef<HTMLElement | undefined>,
  options: MutationObserverInit | undefined,
  callback: MutationCallback
) {
  let observer: MutationObserver;

  watch(dom, (dom) => {
    if (dom) {
      observer = new MutationObserver(callback);
      observer.observe(dom, options);
    } else {
      if (!observer) return;
      observer.disconnect();
    }
  });

  onUnmounted(() => {
    if (!observer) return;
    observer.disconnect();
  });
}
