/**
 * Check whether a dot-notation path exists in an object.
 * Returns `false` if any intermediate segment is nullish.
 */
export function has(obj: Record<string, any>, path: string): boolean {
  const segments = path.split('.');
  let current: unknown = obj;

  for (const segment of segments) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return false;
    }
    if (!(segment in (current as Record<string, unknown>))) {
      return false;
    }
    current = (current as Record<string, unknown>)[segment];
  }

  return true;
}
