/**
 * Immutably remove a property at a dot-notation path.
 * Shallow-clones each level along the path and deletes the leaf key.
 */
export function del<T extends Record<string, any>>(
  obj: T,
  path: string,
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
      return root as T;
    }

    current = current[segment] as Record<string, any>;
  }

  delete current[segments[segments.length - 1]];
  return root as T;
}
