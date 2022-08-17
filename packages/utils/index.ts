export function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return key in object;
}

interface DiffCallback {
  (key: string, object: object | undefined): void;
}

export function diffObject(cur: object, prev: object, cb: DiffCallback) {
  for (const key in cur) {
    if (!isValidKey(key, prev)) return;
    if (prev[key] === undefined) {
      cb(key, cur[key]);
      continue;
    }
    if (cur[key] === prev[key]) continue;
    cb(key, cur[key]);
  }
  for (const key in prev) {
    if (!isValidKey(key, cur)) return;
    if (cur[key] !== undefined) continue;
    cb(key, undefined);
  }
}
