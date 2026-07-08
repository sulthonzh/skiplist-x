# Changelog

All notable changes to skiplist-x will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-07-08

### Added
- Initial release of skiplist-x
- Probabilistic skip list with O(log n) average-case search, insert, delete
- Custom comparator support for sorting by any criteria
- Range queries (`range(low, high)`) for efficient subset retrieval
- ES6 iterators: `for...of`, `entries()`, `keys()`, `values()`
- Serialization methods: `toJSON()` and `fromJSON()`
- Static factory methods: `SkipList.from()` and `SkipList.fromJSON()`
- Debug tools: `isValid()` and `debugHeights()` for structural analysis
- CLI tool (`skiplist-x`) with insert, search, delete, range, demo commands
- 29 comprehensive tests covering edge cases, stress testing (1000 inserts)
- Zero runtime dependencies, pure JavaScript ESM

### Features
- Search: `search(key)`, `get(key)`, `has(key)`
- Modify: `insert(key, value)`, `set(key, value)`, `delete(key)`, `pop(key)`
- Query: `minKey()`, `maxKey()`, `atIndex(idx)`, `range(low, high)`
- Iterate: `forEach(visitor)`, `map(mapper)`, `reduce(reducer, initial)`, `find(predicate)`, `filter(predicate)`
- Bulk: `toArray()`, `keys()`, `values()`, `clear()`

### Configuration
- `maxLevel`: Maximum node height (default: 32, supports ~4B elements)
- `p`: Promotion probability (default: 0.5, geometric distribution)
- `compare`: Custom comparator function (default: numeric)

### Performance
- O(log n) average-case for search, insert, delete
- O(n) for index access and full iteration
- No rebalancing required (self-organizing probabilistic structure)

## [Unreleased]

### Planned
- TypeScript definitions
- Streaming batch insert
- Concurrent read operations