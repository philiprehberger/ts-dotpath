# @philiprehberger/dotpath-ts

[![CI](https://github.com/philiprehberger/dotpath-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/dotpath-ts/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/dotpath-ts.svg)](https://www.npmjs.com/package/@philiprehberger/dotpath-ts)
[![Last updated](https://img.shields.io/github/last-commit/philiprehberger/dotpath-ts)](https://github.com/philiprehberger/dotpath-ts/commits/main)

Type-safe dot-notation access and mutation for nested objects

## Installation

```bash
npm install @philiprehberger/dotpath-ts
```

## Usage

### get

```ts
import { get } from '@philiprehberger/dotpath-ts';

const obj = { a: { b: { c: 42 } } };

get(obj, 'a.b.c');          // 42
get(obj, 'a.b.missing');    // undefined
get(obj, 'a.b.missing', 0); // 0 (default value)
```

### set

```ts
import { set } from '@philiprehberger/dotpath-ts';

const obj = { a: { b: { c: 42 } } };
const updated = set(obj, 'a.b.c', 100);

// updated.a.b.c === 100
// obj.a.b.c === 42 (original unchanged)
```

### has

```ts
import { has } from '@philiprehberger/dotpath-ts';

const obj = { a: { b: { c: 42 } } };

has(obj, 'a.b.c');       // true
has(obj, 'a.b.missing'); // false
```

### del

```ts
import { del } from '@philiprehberger/dotpath-ts';

const obj = { a: { b: { c: 42, d: 'hello' } } };
const result = del(obj, 'a.b.c');

// result.a.b === { d: 'hello' }
// obj.a.b.c === 42 (original unchanged)
```

### update

```ts
import { update } from '@philiprehberger/dotpath-ts';

const obj = { a: { b: { count: 5 } } };
const result = update(obj, 'a.b.count', (v) => (v as number) * 2);

// result.a.b.count === 10
// obj.a.b.count === 5 (original unchanged)
```

## API

| Function | Signature | Description |
|----------|-----------|-------------|
| `get` | `get(obj, path, defaultValue?)` | Retrieve a value at a dot-notation path |
| `set` | `set(obj, path, value)` | Immutably set a value at a dot-notation path |
| `has` | `has(obj, path)` | Check whether a path exists in an object |
| `del` | `del(obj, path)` | Immutably remove a property at a dot-notation path |
| `update` | `update(obj, path, fn)` | Get, transform, and immutably set a value at a path |

### Type Utilities

| Type | Description |
|------|-------------|
| `Paths<T>` | All valid dot-path strings for an object type (depth limit 5) |
| `PathValue<T, P>` | The type at a given dot path within an object type |

## Development

```bash
npm install
npm run build
npm test
```

## Support

If you find this project useful:

⭐ [Star the repo](https://github.com/philiprehberger/dotpath-ts)

🐛 [Report issues](https://github.com/philiprehberger/dotpath-ts/issues?q=is%3Aissue+is%3Aopen+label%3Abug)

💡 [Suggest features](https://github.com/philiprehberger/dotpath-ts/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)

❤️ [Sponsor development](https://github.com/sponsors/philiprehberger)

🌐 [All Open Source Projects](https://philiprehberger.com/open-source-packages)

💻 [GitHub Profile](https://github.com/philiprehberger)

🔗 [LinkedIn Profile](https://www.linkedin.com/in/philiprehberger)

## License

[MIT](LICENSE)
