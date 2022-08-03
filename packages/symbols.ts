import type { Map } from "mapbox-gl";
import type { InjectionKey, ComputedRef } from "vue";

export const mapvueSymbol = Symbol() as InjectionKey<ComputedRef<Map>>;
