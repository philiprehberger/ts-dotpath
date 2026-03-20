/**
 * Immutably set a value at a dot-notation path.
 * Shallow-clones each level along the path and returns the new root object.
 */
export function set<T extends Record<string, any>>(
  obj: T,
  path: string,
  value: unknown,
): T {
  const segments = path.split('.');
  const root = { ...obj } as Record<string, any>;
  let current: Record<string, any> = root;

  for (let i = 0; i < segments.length - 1; i++) {
    const segment = segments[i];
    const next = current[segment];

    if (next !== null && next !== undefined && typeof next === 'object') {
      current[segment] = Array.isArray(next) ? [...next] : { ...next };
    } else {
      current[segment] = {};
    }

    current = current[segment] as Record<string, any>;
  }

  current[segments[segments.length - 1]] = value;
  return root as T;
}
