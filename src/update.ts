import { get } from './get.js';
import { set } from './set.js';

/**
 * Get the current value at a dot-notation path, apply a transform function,
 * and immutably set the result back.
 */
export function update<T extends Record<string, any>>(
  obj: T,
  path: string,
  fn: (value: unknown) => unknown,
): T {
  const current = get(obj, path);
  return set(obj, path, fn(current));
}
