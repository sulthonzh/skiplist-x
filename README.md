# skiplist-x — Probabilistic Skip List

A zero-dependency skip list data structure with O(log n) average-case search, insert, and delete operations. Perfect for ordered collections where you need efficient lookups and range queries without the complexity of balanced trees.

## Quick Start

```js
import { SkipList } from 'skiplist-x';

const sl = new SkipList();
sl.insert(5, 'five');
sl.insert(1, 'one');
sl.insert(10, 'ten');

console.log(sl.get(5));       // 'five'
console.log(sl.minKey());     // 1
console.log(sl.maxKey());     // 10
console.log(sl.range(3, 8));  // [[5, 'five']]

for (const [key, value] of sl) {
  console.log(key, value);    // 1 one, 5 five, 10 ten
}
```

## CLI

```bash
# Insert and query
echo '[42, "answer"]' | skiplist-x insert 42 answer
skiplist-x list --json

# Demo with sample data
skiplist-x demo --json

# Check structural integrity
skiplist-x valid
```

## Why Skip Lists?

Skip lists offer the same asymptotic performance as balanced trees (O(log n)) but with simpler implementation and better cache locality. Unlike trees, skip lists don't require rebalancing after insertions or deletions—the probabilistic structure self-organizes.

## Features

- **Zero dependencies** — pure JavaScript, no runtime deps
- **O(log n) average-case** — search, insert, delete operations
- **Custom comparators** — sort by any criteria (strings, objects, etc.)
- **Range queries** — efficient subset retrieval
- **Iterators** — ES6 `for...of`, `entries()`, `keys()`, `values()`
- **Serialization** — `toJSON()` / `fromJSON()` for persistence
- **Debug tools** — `isValid()`, `debugHeights()` for structural analysis

## Examples

### Leaderboard with custom comparator

```js
const leaderboard = new SkipList({
  compare: (a, b) => b.score - a.score  // Descending by score
});

leaderboard.insert({ name: 'alice', score: 95 }, 'gold');
leaderboard.insert({ name: 'bob', score: 87 }, 'silver');
leaderboard.insert({ name: 'charlie', score: 92 }, 'bronze');

const top3 = leaderboard.range({ score: 100 }, { score: 85 });
console.log(top3);  // [[alice], [charlie], [bob]]
```

### Time-series data with range queries

```js
const timeline = new SkipList();

// Insert timestamped events
timeline.insert(1712521200000, { event: 'login', user: 'alice' });
timeline.insert(1712524800000, { event: 'upload', user: 'bob' });
timeline.insert(1712528400000, { event: 'logout', user: 'alice' });

// Query events within a time window
const events = timeline.range(1712521200000, 1712524800000);
console.log(events);  // Events from first timestamp to just before second
```

### In-memory cache with LRU-style access

```js
const cache = new SkipList();

cache.insert('key1', 'value1');
cache.insert('key2', 'value2');

// LRU-style pop (remove and return)
const val = cache.pop('key1');
console.log(val);  // 'value1'
console.log(cache.has('key1'));  // false
```

## Comparison

| Feature | skiplist-x | rbush | sortedarray | tiny-skiplist |
|---------|-----------|-------|-------------|---------------|
| Zero deps | ✅ | ❌ | ✅ | ❌ |
| ES6 iterators | ✅ | ❌ | ✅ | ❌ |
| Custom comparators | ✅ | ❌ | ✅ | ❌ |
| Serialization | ✅ | ❌ | ✅ | ❌ |
| CLI included | ✅ | ❌ | ❌ | ❌ |
| O(log n) ops | ✅ | ✅ (R-tree) | ✅ (binary search) | ✅ |
| Bundle size | ~3.2 KB | ~8.5 KB | ~2.1 KB | ~1.8 KB |

## License

MIT

## Repository

https://github.com/sulthonzh/skiplist-x