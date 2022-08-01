import { onMounted, ref, onUnmounted } from "vue";

export function useMutationObserver(
  dom: Node,
  options: MutationObserverInit | undefined,
  callback: MutationCallback
) {
  const observer = ref<MutationObserver>();

  onMounted(() => {
    observer.value = new MutationObserver(callback);
    observer.value.observe(dom, options);
  });

  onUnmounted(() => {
    if (!observer.value) return;
    observer.value.disconnect();
  });
}
