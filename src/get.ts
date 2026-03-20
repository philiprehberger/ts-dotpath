/**
 * Retrieve a value from a nested object using a dot-notation path.
 * Returns `defaultValue` (or `undefined`) if any intermediate segment is nullish.
 */
export function get<T extends Record<string, any>, P extends string>(
  obj: T,
  path: P,
): unknown;
export function get<T extends Record<string, any>, P extends string, D>(
  obj: T,
  path: P,
  defaultValue: D,
): unknown;
export function get(
  obj: Record<string, any>,
  path: string,
  defaultValue?: unknown,
): unknown {
  const segments = path.split('.');
  let current: unknown = obj;

  for (const segment of segments) {
    if (current === null || current === undefined) {
      return defaultValue;
    }
    current = (current as Record<string, unknown>)[segment];
  }

  return current === undefined ? defaultValue : current;
}
