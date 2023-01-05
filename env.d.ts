/// <reference types="vite/client" />

declare module "@mapbox/mapbox-gl-sync-move";
declare module "mapbox-gl-compare";

declare module "*.vue" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent<
    Record<string, never>,
    Record<string, never>,
    unknown
  >;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_ACCESS_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
