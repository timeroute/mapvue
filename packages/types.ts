import { LngLatBoundsLike } from "mapbox-gl";
import { LngLatLike } from "mapbox-gl";
import { InteractiveOptions } from "mapbox-gl";

export interface MapboxOptions {
  /**
   * If true, the gl context will be created with MSA antialiasing, which can be useful for antialiasing custom layers.
   * This is false by default as a performance optimization.
   */
  antialias?: boolean | undefined;

  /** If true, an attribution control will be added to the map. */
  attributionControl?: boolean | undefined;

  bearing?: number | undefined;

  /** Snap to north threshold in degrees. */
  bearingSnap?: number | undefined;

  /** The initial bounds of the map. If bounds is specified, it overrides center and zoom constructor options. */
  bounds?: LngLatBoundsLike | undefined;

  /** If true, enable the "box zoom" interaction (see BoxZoomHandler) */
  boxZoom?: boolean | undefined;

  /** initial map center */
  center?: LngLatLike | undefined;

  /**
   * The max number of pixels a user can shift the mouse pointer during a click for it to be
   * considered a valid click (as opposed to a mouse drag).
   *
   * @default 3
   */
  clickTolerance?: number | undefined;

  /**
   * If `true`, Resource Timing API information will be collected for requests made by GeoJSON
   * and Vector Tile web workers (this information is normally inaccessible from the main
   * Javascript thread). Information will be returned in a `resourceTiming` property of
   * relevant `data` events.
   *
   * @default false
   */
  collectResourceTiming?: boolean | undefined;

  /**
   * If `true`, symbols from multiple sources can collide with each other during collision
   * detection. If `false`, collision detection is run separately for the symbols in each source.
   *
   * @default true
   */
  crossSourceCollisions?: boolean | undefined;

  /**
   * If `true` , scroll zoom will require pressing the ctrl or ⌘ key while scrolling to zoom map,
   * and touch pan will require using two fingers while panning to move the map.
   * Touch pitch will require three fingers to activate if enabled.
   */
  cooperativeGestures?: boolean;

  /** String or strings to show in an AttributionControl.
   * Only applicable if options.attributionControl is `true`. */
  customAttribution?: string | string[] | undefined;

  /**
   * If `true`, the "drag to pan" interaction is enabled.
   * An `Object` value is passed as options to {@link DragPanHandler#enable}.
   */
  dragPan?: boolean | DragPanOptions | undefined;

  /** If true, enable the "drag to rotate" interaction (see DragRotateHandler). */
  dragRotate?: boolean | undefined;

  /** If true, enable the "double click to zoom" interaction (see DoubleClickZoomHandler). */
  doubleClickZoom?: boolean | undefined;

  /** If `true`, the map's position (zoom, center latitude, center longitude, bearing, and pitch) will be synced with the hash fragment of the page's URL.
   * For example, `http://path/to/my/page.html#2.59/39.26/53.07/-24.1/60`.
   * An additional string may optionally be provided to indicate a parameter-styled hash,
   * e.g. http://path/to/my/page.html#map=2.59/39.26/53.07/-24.1/60&foo=bar, where foo
   * is a custom parameter and bar is an arbitrary hash distinct from the map hash.
   * */
  hash?: boolean | string | undefined;

  /**
   * Controls the duration of the fade-in/fade-out animation for label collisions, in milliseconds.
   * This setting affects all symbol layers. This setting does not affect the duration of runtime
   * styling transitions or raster tile cross-fading.
   *
   * @default 300
   */
  fadeDuration?: number | undefined;

  /** If true, map creation will fail if the implementation determines that the performance of the created WebGL context would be dramatically lower than expected. */
  failIfMajorPerformanceCaveat?: boolean | undefined;

  /** A fitBounds options object to use only when setting the bounds option. */
  fitBoundsOptions?: FitBoundsOptions | undefined;

  /** If false, no mouse, touch, or keyboard listeners are attached to the map, so it will not respond to input */
  interactive?: boolean | undefined;

  /** If true, enable keyboard shortcuts (see KeyboardHandler). */
  keyboard?: boolean | undefined;

  /** A patch to apply to the default localization table for UI strings, e.g. control tooltips.
   * The `locale` object maps namespaced UI string IDs to translated strings in the target language;
   * see `src/ui/default_locale.js` for an example with all supported string IDs.
   * The object may specify all UI strings (thereby adding support for a new translation) or
   * only a subset of strings (thereby patching the default translation table).
   */
  locale?: { [key: string]: string } | undefined;

  /**
   * Overrides the generation of all glyphs and font settings except font-weight keywords
   * Also overrides localIdeographFontFamily
   * @default null
   */
  localFontFamily?: string | undefined;

  /**
   * If specified, defines a CSS font-family for locally overriding generation of glyphs in the
   * 'CJK Unified Ideographs' and 'Hangul Syllables' ranges. In these ranges, font settings from
   * the map's style will be ignored, except for font-weight keywords (light/regular/medium/bold).
   * The purpose of this option is to avoid bandwidth-intensive glyph server requests.
   *
   * @default null
   */
  localIdeographFontFamily?: string | undefined;

  /**
   * A string representing the position of the Mapbox wordmark on the map.
   *
   * @default "bottom-left"
   */
  logoPosition?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | undefined;

  /** If set, the map is constrained to the given bounds. */
  maxBounds?: LngLatBoundsLike | undefined;

  /** Maximum pitch of the map. */
  maxPitch?: number | undefined;

  /** Maximum zoom of the map. */
  maxZoom?: number | undefined;

  /** Minimum pitch of the map. */
  minPitch?: number | undefined;

  /** Minimum zoom of the map. */
  minZoom?: number | undefined;

  /**
   * If true, map will prioritize rendering for performance by reordering layers
   * If false, layers will always be drawn in the specified order
   *
   * @default true
   */
  optimizeForTerrain?: boolean | undefined;

  /** If true, The maps canvas can be exported to a PNG using map.getCanvas().toDataURL();. This is false by default as a performance optimization. */
  preserveDrawingBuffer?: boolean | undefined;

  /**
   * The initial pitch (tilt) of the map, measured in degrees away from the plane of the
   * screen (0-60).
   *
   * @default 0
   */
  pitch?: number | undefined;

  /**
   * A style's projection property sets which projection a map is rendered in.
   *
   * @default 'mercator'
   */
  projection?: {
    name:
      | "albers"
      | "equalEarth"
      | "equirectangular"
      | "lambertConformalConic"
      | "mercator"
      | "naturalEarth"
      | "winkelTripel"
      | "globe";
    center?: [number, number];
    parallels?: [number, number];
  };

  /**
   * If `false`, the map's pitch (tilt) control with "drag to rotate" interaction will be disabled.
   *
   * @default true
   */
  pitchWithRotate?: boolean | undefined;

  /**
   * If `false`, the map won't attempt to re-request tiles once they expire per their HTTP
   * `cacheControl`/`expires` headers.
   *
   * @default true
   */
  refreshExpiredTiles?: boolean | undefined;

  /**
   * If `true`, multiple copies of the world will be rendered, when zoomed out.
   *
   * @default true
   */
  renderWorldCopies?: boolean | undefined;

  /**
   * If `true`, the "scroll to zoom" interaction is enabled.
   * An `Object` value is passed as options to {@link ScrollZoomHandler#enable}.
   */
  scrollZoom?: boolean | InteractiveOptions | undefined;

  /** stylesheet location */
  style?: mapboxgl.Style | string | undefined;

  /** If  true, the map will automatically resize when the browser window resizes */
  trackResize?: boolean | undefined;

  /**
   * A callback run before the Map makes a request for an external URL. The callback can be
   * used to modify the url, set headers, or set the credentials property for cross-origin requests.
   *
   * @default null
   */
  transformRequest?: TransformRequestFunction | undefined;

  /**
   * If `true`, the "pinch to rotate and zoom" interaction is enabled.
   * An `Object` value is passed as options to {@link TouchZoomRotateHandler#enable}.
   */
  touchZoomRotate?: boolean | InteractiveOptions | undefined;

  /**
   * If `true`, the "drag to pitch" interaction is enabled.
   * An `Object` value is passed as options to {@link TouchPitchHandler#enable}.
   */
  touchPitch?: boolean | InteractiveOptions | undefined;

  /** Initial zoom level */
  zoom?: number | undefined;

  /**
   * The maximum number of tiles stored in the tile cache for a given source. If omitted, the
   * cache will be dynamically sized based on the current viewport.
   *
   * @default null
   */
  maxTileCacheSize?: number | undefined;

  /**
   * If specified, map will use this token instead of the one defined in mapboxgl.accessToken.
   *
   * @default null
   */
  accessToken?: string | undefined;

  /**
   * Allows for the usage of the map in automated tests without an accessToken with custom self-hosted test fixtures.
   *
   * @default null
   */
  testMode?: boolean | undefined;
}
