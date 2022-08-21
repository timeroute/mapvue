import type { AnyLayout, AnyPaint } from "mapbox-gl";

export function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return key in object;
}

interface DiffCallback {
  (key: string, value: unknown): void;
}

export function diffObject(
  cur: AnyPaint | AnyLayout,
  prev: AnyPaint | AnyLayout,
  cb: DiffCallback
) {
  for (const key in cur) {
    if (key in prev) {
      // both has key, compare equal
      if (cur[key] === prev[key]) continue;
    }
    cb(key, cur[key]);
  }
  for (const key in prev) {
    if (key in cur) continue;
    cb(key, undefined);
  }
}
