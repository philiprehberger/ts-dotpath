import { describe, it } from 'node:test';
import assert from 'node:assert';
import { get, set, has, del, update } from '../../dist/index.js';

const sample = {
  a: {
    b: {
      c: 42,
      d: 'hello',
    },
    e: [1, 2, 3],
  },
  x: 'top',
};

describe('get', () => {
  it('should access a deeply nested value', () => {
    assert.strictEqual(get(sample, 'a.b.c'), 42);
  });

  it('should access a top-level value', () => {
    assert.strictEqual(get(sample, 'x'), 'top');
  });

  it('should return undefined for a missing path', () => {
    assert.strictEqual(get(sample, 'a.b.missing'), undefined);
  });

  it('should return undefined when an intermediate is missing', () => {
    assert.strictEqual(get(sample, 'a.z.c'), undefined);
  });

  it('should return the default value when the path is missing', () => {
    assert.strictEqual(get(sample, 'a.b.missing', 'fallback'), 'fallback');
  });

  it('should return the existing value even if a default is provided', () => {
    assert.strictEqual(get(sample, 'a.b.c', 99), 42);
  });

  it('should access array elements by numeric index', () => {
    assert.strictEqual(get(sample, 'a.e.0'), 1);
    assert.strictEqual(get(sample, 'a.e.2'), 3);
  });
});

describe('set', () => {
  it('should set a deeply nested value and return a new object', () => {
    const result = set(sample, 'a.b.c', 100);
    assert.strictEqual(get(result, 'a.b.c'), 100);
    assert.notStrictEqual(result, sample);
  });

  it('should not mutate the original object', () => {
    set(sample, 'a.b.c', 100);
    assert.strictEqual(sample.a.b.c, 42);
  });

  it('should create intermediate objects if they do not exist', () => {
    const result = set(sample, 'a.new.path', 'value');
    assert.strictEqual(get(result, 'a.new.path'), 'value');
  });

  it('should set a top-level value', () => {
    const result = set(sample, 'x', 'changed');
    assert.strictEqual(result.x, 'changed');
    assert.strictEqual(sample.x, 'top');
  });
});

describe('has', () => {
  it('should return true for an existing path', () => {
    assert.strictEqual(has(sample, 'a.b.c'), true);
  });

  it('should return true for a top-level key', () => {
    assert.strictEqual(has(sample, 'x'), true);
  });

  it('should return false for a missing path', () => {
    assert.strictEqual(has(sample, 'a.b.missing'), false);
  });

  it('should return false when an intermediate is missing', () => {
    assert.strictEqual(has(sample, 'a.z.c'), false);
  });

  it('should return true for array index access', () => {
    assert.strictEqual(has(sample, 'a.e.0'), true);
  });
});

describe('del', () => {
  it('should remove a deeply nested key', () => {
    const result = del(sample, 'a.b.c');
    assert.strictEqual(has(result, 'a.b.c'), false);
    assert.strictEqual(get(result, 'a.b.d'), 'hello');
  });

  it('should not mutate the original object', () => {
    del(sample, 'a.b.c');
    assert.strictEqual(sample.a.b.c, 42);
  });

  it('should remove a top-level key', () => {
    const result = del(sample, 'x');
    assert.strictEqual(has(result, 'x'), false);
  });

  it('should return a copy even if the path does not exist', () => {
    const result = del(sample, 'a.z.missing');
    assert.notStrictEqual(result, sample);
  });
});

describe('update', () => {
  it('should transform a value at a path', () => {
    const result = update(sample, 'a.b.c', (v) => (v as number) * 2);
    assert.strictEqual(get(result, 'a.b.c'), 84);
  });

  it('should not mutate the original object', () => {
    update(sample, 'a.b.c', (v) => (v as number) * 2);
    assert.strictEqual(sample.a.b.c, 42);
  });

  it('should handle undefined current values', () => {
    const result = update(sample, 'a.b.missing', (v) => v ?? 'created');
    assert.strictEqual(get(result, 'a.b.missing'), 'created');
  });
});
