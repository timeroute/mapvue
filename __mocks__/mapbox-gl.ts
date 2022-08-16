import { vi } from "vitest";

// LngLatBounds
function LngLatBounds() {}

LngLatBounds.prototype.toArray = () => [
  [-180, -90],
  [180, 90],
];

// Map
function Map() {
  this._sources = {};
  this._images = {};
  this._layers = [];
  this._controls = [];

  this.style = {
    sources: this._sources,
    layers: this._layers,
    sourceCaches: {},
  };

  this.flyTo = vi.fn();
  this.easeTo = vi.fn();
  this.jumpTo = vi.fn();

  this.getCanvas = vi.fn(() => ({ style: { cursor: "default" } }));
  this.getCenter = vi.fn(() => ({ lat: 0, lng: 0 }));
  this.getBearing = vi.fn(() => 0);
  this.getPitch = vi.fn(() => 0);
  this.getZoom = vi.fn(() => 0);
  this.queryRenderedFeatures = vi.fn(() => []);
  this.setFeatureState = vi.fn();
  this.removeFeatureState = vi.fn();

  return this;
}

Map.prototype.once = function once(_, listener, fn) {
  const handler = typeof listener === "function" ? listener : fn;
  handler({ target: this });
};

Map.prototype.on = function on(_, listener, fn) {
  const handler = typeof listener === "function" ? listener : fn;
  handler({ target: this, originalEvent: true, point: { x: 0, y: 0 } });
};

Map.prototype.off = vi.fn();

Map.prototype.getStyle = function getStyle() {
  return this.style;
};

Map.prototype.setStyle = vi.fn();
Map.prototype.fitBounds = vi.fn();
Map.prototype.setMaxZoom = vi.fn();
Map.prototype.setMinZoom = vi.fn();
Map.prototype.setMaxPitch = vi.fn();
Map.prototype.setMinPitch = vi.fn();
Map.prototype.setMaxBounds = vi.fn();
Map.prototype.setLayerZoomRange = vi.fn();

Map.prototype.addSource = function addSource(name, source) {
  this._sources[name] = source;
  this.style.sourceCaches[name] = {
    clearTiles: vi.fn(),
  };
};

Map.prototype.getSource = function getSource(name) {
  if (!this._sources[name]) {
    return undefined;
  }

  const source = {
    setData: vi.fn(),
    load: vi.fn(),
    updateImage: vi.fn(),
    _tileJSONRequest: {
      cancel: vi.fn(),
    },
    ...this._sources[name],
  };

  return source;
};

Map.prototype.isSourceLoaded = function isSourceLoaded(name) {
  return !!this._sources[name];
};

Map.prototype.removeSource = function removeSource(name) {
  delete this._sources[name];
};

Map.prototype.addLayer = function addLayer(layer) {
  this._layers.push(layer);
};

Map.prototype.getLayer = function getLayer(id) {
  const index = this._layers.findIndex((layer) => id === layer.id);
  if (index === -1) {
    return undefined;
  }

  return this._layers[index];
};

Map.prototype.moveLayer = function moveLayer(id, before) {
  const index = this._layers.findIndex((layer) => id === layer.id);
  const beforeIndex = this._layers.findIndex((layer) => before === layer.id);
  if (!this._layers[index] || !this._layers[beforeIndex]) {
    throw new Error();
  }

  const layer = this._layers[index];
  this._layers.splice(index, 1);
  this._layers.splice(beforeIndex, 0, layer);
};

Map.prototype.removeLayer = function removeLayer(id) {
  const index = this._layers.findIndex((layer) => id === layer.id);
  if (!this._layers[index]) {
    throw new Error();
  }

  this._layers.splice(index, 1);
};

Map.prototype.loadImage = function loadImage(url, callback) {
  const data = new Uint8Array([]);
  callback(null, data);
};

Map.prototype.addImage = function addImage(id, image) {
  this._images[id] = image;
};

Map.prototype.updateImage = function updateImage(id, image) {
  this._images[id] = image;
};

Map.prototype.hasImage = function hasImage(id) {
  return !!this._images[id];
};

Map.prototype.removeImage = function removeImage(id) {
  delete this._images[id];
};

Map.prototype.remove = vi.fn();
Map.prototype.addControl = function addControl(control) {
  control.onAdd(this);
  this._controls.push(control);

  return this;
};
Map.prototype.removeControl = vi.fn();
Map.prototype.fire = vi.fn();

Map.prototype.setPaintProperty = vi.fn();
Map.prototype.setLayoutProperty = vi.fn();
Map.prototype.setFilter = vi.fn();

Map.prototype.getBounds = () => new LngLatBounds();

function Popup() {
  this.setLngLat = vi.fn(() => this);
  this.getLngLat = vi.fn(() => this);

  this.addTo = vi.fn((map) => {
    if (!map) {
      throw new Error();
    }

    return this;
  });

  this.setDOMContent = vi.fn(() => this);
  this.setHTML = vi.fn(() => this);
  this.setOffset = vi.fn((offset) => this);
  this.setMaxWidth = vi.fn((width) => this);
  this.remove = vi.fn();

  return this;
}

Popup.prototype.on = function on(listener, fn) {
  fn({ target: this });
};

Popup.prototype.off = function on(listener, fn) {
  fn({ target: this });
};

function Marker() {
  this.setLngLat = vi.fn(() => this);
  this.getLngLat = vi.fn(() => this);

  this.addTo = vi.fn((map) => {
    if (!map) {
      throw new Error();
    }

    return this;
  });

  this.remove = vi.fn();

  return this;
}

Marker.prototype.on = function on(listener, fn) {
  fn({ target: this });
};

function AttributionControl() {
  this.onAdd = vi.fn();

  return this;
}

function FullscreenControl() {
  this.onAdd = vi.fn();

  return this;
}

function GeolocateControl() {
  this.onAdd = vi.fn();

  return this;
}

GeolocateControl.prototype.on = function on(listener, fn) {
  fn({ target: this });
};

function NavigationControl() {
  this.onAdd = vi.fn();

  return this;
}

function ScaleControl() {
  this.onAdd = vi.fn();

  return this;
}

function TrafficControl() {
  return this;
}

module.exports = {
  Map,
  Popup,
  Marker,
  AttributionControl,
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
  TrafficControl,
  supported: () => true,
};
