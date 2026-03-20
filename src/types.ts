/**
 * Recursive type that produces all valid dot-path strings for an object type.
 * Uses a depth counter (tuple length) to prevent infinite recursion, stopping at depth 5.
 */
export type Paths<T, Depth extends unknown[] = []> = Depth['length'] extends 5
  ? never
  : T extends Record<string, any>
    ? {
        [K in keyof T & (string | number)]: T[K] extends Record<string, any>
          ? T[K] extends any[]
            ? `${K}` | `${K}.${Paths<T[K], [...Depth, 0]>}`
            : `${K}` | `${K}.${Paths<T[K], [...Depth, 0]>}`
          : `${K}`;
      }[keyof T & (string | number)]
    : never;

/**
 * Resolves the type at a given dot path within an object type.
 * Splits P on the first `.`, looks up the key, and recurses on the rest.
 */
export type PathValue<
  T,
  P extends string,
> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? PathValue<T[K], Rest>
    : K extends `${number}`
      ? T extends any[]
        ? PathValue<T[number], Rest>
        : unknown
      : unknown
  : P extends keyof T
    ? T[P]
    : P extends `${number}`
      ? T extends any[]
        ? T[number]
        : unknown
      : unknown;
