import type { Map, MapLayerEventType } from "mapbox-gl";
import { onBeforeUnmount, onMounted } from "vue";

export function useLayerEvent(
  map: Map,
  event: keyof MapLayerEventType,
  id: string,
  callback: (
    ev: (mapboxgl.MapLayerMouseEvent | mapboxgl.MapLayerTouchEvent) &
      mapboxgl.EventData
  ) => void
) {
  onMounted(() => {
    map.on(event, id, callback);
  });
  onBeforeUnmount(() => {
    map.off(event, id, callback);
  });
}
