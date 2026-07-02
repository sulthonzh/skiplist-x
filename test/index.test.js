'use strict';

import { test } from 'node:test';
import assert from 'node:assert';
import { SkipList, defaultCompare, randomLevel } from '../src/index.js';

// ─── Basic Operations ──────────────────────────────────────

test('SkipList - basic insert and search', () => {
  const sl = new SkipList();
  assert.strictEqual(sl.size, 0);
  
  sl.insert(1, 'one');
  sl.insert(2, 'two');
  sl.insert(3, 'three');
  
  assert.strictEqual(sl.size, 3);
  assert.strictEqual(sl.search(1), 'one');
  assert.strictEqual(sl.search(2), 'two');
  assert.strictEqual(sl.search(3), 'three');
  assert.strictEqual(sl.search(4), undefined);
});

test('SkipList - set alias', () => {
  const sl = new SkipList();
  sl.set(1, 'one');
  assert.strictEqual(sl.get(1), 'one');
});

test('SkipList - has method', () => {
  const sl = new SkipList();
  sl.insert(1, 'one');
  sl.insert(2, 'two');
  
  assert.strictEqual(sl.has(1), true);
  assert.strictEqual(sl.has(2), true);
  assert.strictEqual(sl.has(3), false);
});

test('SkipList - delete', () => {
  const sl = new SkipList();
  sl.insert(1, 'one');
  sl.insert(2, 'two');
  sl.insert(3, 'three');
  
  assert.strictEqual(sl.delete(2), true);
  assert.strictEqual(sl.has(2), false);
  assert.strictEqual(sl.size, 2);
  assert.strictEqual(sl.delete(99), false);
});

test('SkipList - pop', () => {
  const sl = new SkipList();
  sl.insert(1, 'one');
  sl.insert(2, 'two');
  
  assert.strictEqual(sl.pop(2), 'two');
  assert.strictEqual(sl.has(2), false);
  assert.strictEqual(sl.pop(99), undefined);
});

// ─── Edge Cases ───────────────────────────────────────────

test('SkipList - empty list operations', () => {
  const sl = new SkipList();
  
  assert.strictEqual(sl.search(1), undefined);
  assert.strictEqual(sl.get(1), undefined);
  assert.strictEqual(sl.has(1), false);
  assert.strictEqual(sl.delete(1), false);
  assert.strictEqual(sl.pop(1), undefined);
  assert.strictEqual(sl.minKey(), undefined);
  assert.strictEqual(sl.maxKey(), undefined);
  assert.deepStrictEqual(sl.toArray(), []);
});

test('SkipList - duplicate inserts', () => {
  const sl = new SkipList();
  sl.insert(1, 'first');
  sl.insert(1, 'second'); // should update
  
  assert.strictEqual(sl.size, 1);
  assert.strictEqual(sl.get(1), 'second');
});

test('SkipList - single element', () => {
  const sl = new SkipList();
  sl.insert(1, 'one');
  
  assert.strictEqual(sl.size, 1);
  assert.strictEqual(sl.minKey(), 1);
  assert.strictEqual(sl.maxKey(), 1);
  assert.deepStrictEqual(sl.toArray(), [[1, 'one']]);
});

// ─── Range and Utility Methods ──────────────────────────────

test('SkipList - range queries', () => {
  const sl = new SkipList();
  for (let i = 1; i <= 10; i++) {
    sl.insert(i, `val${i}`);
  }
  
  // Full range
  assert.deepStrictEqual(sl.range(1, 11), [
    [1, 'val1'], [2, 'val2'], [3, 'val3'], [4, 'val4'], [5, 'val5'],
    [6, 'val6'], [7, 'val7'], [8, 'val8'], [9, 'val9'], [10, 'val10']
  ]);
  
  // Subrange
  assert.deepStrictEqual(sl.range(3, 7), [
    [3, 'val3'], [4, 'val4'], [5, 'val5'], [6, 'val6']
  ]);
  
  // Open range
  assert.deepStrictEqual(sl.range(8), [
    [8, 'val8'], [9, 'val9'], [10, 'val10']
  ]);
  
  // Empty range
  assert.deepStrictEqual(sl.range(99), []);
});

test('SkipList - index access', () => {
  const sl = new SkipList();
  for (let i = 1; i <= 5; i++) {
    sl.insert(i, `val${i}`);
  }
  
  assert.deepStrictEqual(sl.atIndex(0), [1, 'val1']);
  assert.deepStrictEqual(sl.atIndex(2), [3, 'val3']);
  assert.deepStrictEqual(sl.atIndex(4), [5, 'val5']);
  assert.strictEqual(sl.atIndex(5), undefined);
  assert.strictEqual(sl.atIndex(-1), undefined);
});

test('SkipList - filter, map, reduce', () => {
  const sl = new SkipList();
  for (let i = 1; i <= 10; i++) {
    sl.insert(i, i * 10); // value = key * 10
  }
  
  // Filter
  assert.deepStrictEqual(sl.filter(k => k % 2 === 0).map(([k, v]) => v), 
    [20, 40, 60, 80, 100]);
  
  // Map
  assert.deepStrictEqual(sl.map(([k, v]) => v), 
    [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
  
  // Reduce
  assert.strictEqual(sl.reduce((acc, k, v) => acc + v, 0), 550);
});

test('SkipList - find', () => {
  const sl = new SkipList();
  sl.insert(1, 'one');
  sl.insert(2, 'two');
  sl.insert(3, 'three');
  
  assert.deepStrictEqual(sl.find(([k, v]) => k === 2), [2, 'two']);
  assert.strictEqual(sl.find(([k, v]) => k === 99), undefined);
});

// ─── Iterator Methods ──────────────────────────────────────

test('SkipList - forEach', () => {
  const sl = new SkipList();
  for (let i = 1; i <= 3; i++) {
    sl.insert(i, `val${i}`);
  }
  
  const result = [];
  sl.forEach((key, value) => {
    result.push(`${key}:${value}`);
  });
  
  assert.deepStrictEqual(result, ['1:val1', '2:val2', '3:val3']);
});

test('SkipList - iterators', () => {
  const sl = new SkipList();
  sl.insert(1, 'one');
  sl.insert(2, 'two');
  sl.insert(3, 'three');
  
  // Default iterator
  const entries = Array.from(sl);
  assert.deepStrictEqual(entries, [[1, 'one'], [2, 'two'], [3, 'three']]);
  
  // entries() iterator
  const entries2 = Array.from(sl.entries());
  assert.deepStrictEqual(entries2, [[1, 'one'], [2, 'two'], [3, 'three']]);
  
  // keys() and values()
  assert.deepStrictEqual(Array.from(sl.keys()), [1, 2, 3]);
  assert.deepStrictEqual(Array.from(sl.values()), ['one', 'two', 'three']);
});

// ─── Keys and Values ────────────────────────────────────────

test('SkipList - keys and values methods', () => {
  const sl = new SkipList();
  sl.insert(1, 'one');
  sl.insert(2, 'two');
  sl.insert(3, 'three');
  
  assert.deepStrictEqual(sl.keys(), [1, 2, 3]);
  assert.deepStrictEqual(sl.values(), ['one', 'two', 'three']);
});

test('SkipList - min and max keys', () => {
  const sl = new SkipList();
  sl.insert(3, 'three');
  sl.insert(1, 'one');
  sl.insert(2, 'two');
  
  assert.strictEqual(sl.minKey(), 1);
  assert.strictEqual(sl.maxKey(), 3);
});

// ─── Clear and Array Conversion ───────────────────────────

test('SkipList - clear', () => {
  const sl = new SkipList();
  sl.insert(1, 'one');
  sl.insert(2, 'two');
  
  assert.strictEqual(sl.size, 2);
  sl.clear();
  assert.strictEqual(sl.size, 0);
  assert.strictEqual(sl.has(1), false);
  assert.strictEqual(sl.minKey(), undefined);
});

test('SkipList - toArray', () => {
  const sl = new SkipList();
  sl.insert(2, 'two');
  sl.insert(1, 'one');
  sl.insert(3, 'three');
  
  assert.deepStrictEqual(sl.toArray(), [[1, 'one'], [2, 'two'], [3, 'three']]);
});

// ─── Custom Comparator ──────────────────────────────────────

test('SkipList - custom comparator', () => {
  const sl = new SkipList({
    compare: (a, b) => a.length - b.length // sort by string length
  });
  
  sl.insert('apple', 'fruit');
  sl.insert('banana', 'fruit');
  sl.insert('kiwi', 'fruit');
  sl.insert('orange', 'fruit');
  
  // Sorted by length: kiwi(4), apple(5), banana(6), orange(6)
  assert.deepStrictEqual(sl.keys(), ['kiwi', 'apple', 'banana', 'orange']);
  assert.deepStrictEqual(sl.toArray(), [
    ['kiwi', 'fruit'], ['apple', 'fruit'], ['banana', 'fruit'], ['orange', 'fruit']
  ]);
});

// ─── Static Methods ────────────────────────────────────────

test('SkipList - from static method', () => {
  const entries = [[1, 'one'], [2, 'two'], [3, 'three']];
  const sl = SkipList.from(entries);
  
  assert.strictEqual(sl.size, 3);
  assert.strictEqual(sl.get(1), 'one');
  assert.strictEqual(sl.get(2), 'two');
  assert.strictEqual(sl.get(3), 'three');
});

test('SkipList - fromJSON static method', () => {
  const json = {
    entries: [[1, 'one'], [2, 'two']],
    maxLevel: 4,
    p: 0.5
  };
  
  const sl = SkipList.fromJSON(json);
  assert.strictEqual(sl.size, 2);
  assert.strictEqual(sl.get(1), 'one');
  assert.strictEqual(sl.get(2), 'two');
  // currentLevel depends on random level generation; just verify it's in valid range
  assert.ok(sl.currentLevel >= 0 && sl.currentLevel <= json.maxLevel);
});

test('SkipList - toJSON method', () => {
  const sl = new SkipList();
  sl.insert(1, 'one');
  sl.insert(2, 'two');
  
  const json = sl.toJSON();
  assert.deepStrictEqual(json.entries, [[1, 'one'], [2, 'two']]);
  assert.strictEqual(typeof json.maxLevel, 'number');
  assert.strictEqual(typeof json.p, 'number');
});

// ─── Validation and Debug ─────────────────────────────────

test('SkipList - isValid', () => {
  const sl = new SkipList();
  sl.insert(1, 'one');
  sl.insert(2, 'two');
  sl.insert(3, 'three');
  
  assert.strictEqual(sl.isValid(), true);
});

test('SkipList - debugHeights', () => {
  const sl = new SkipList();
  sl.insert(1, 'one');
  sl.insert(2, 'two');
  sl.insert(3, 'three');
  
  const heights = sl.debugHeights();
  assert.strictEqual(heights.length, 3);
  assert.strictEqual(heights[0].key, 1);
  // With p=0.5, node levels are geometrically distributed — just verify non-negative
  assert.ok(heights[0].level >= 0);
  assert.ok(heights.every(h => h.level >= 0));
});

// ─── Advanced Features ─────────────────────────────────────

test('SkipList - complex values', () => {
  const sl = new SkipList();
  sl.insert(1, { name: 'one', data: [1, 2, 3] });
  sl.insert(2, { name: 'two', data: [4, 5, 6] });
  
  assert.deepStrictEqual(sl.get(1).data, [1, 2, 3]);
  assert.deepStrictEqual(sl.get(2).data, [4, 5, 6]);
});

test('SkipList - numeric and string mixing', () => {
  // Using custom comparator to mix types
  const sl = new SkipList({
    compare: (a, b) => {
      const aStr = String(a);
      const bStr = String(b);
      if (aStr < bStr) return -1;
      if (aStr > bStr) return 1;
      return 0;
    }
  });
  
  sl.insert('10', 'ten');
  sl.insert(2, 'two');
  sl.insert(1, 'one');
  
  assert.deepStrictEqual(sl.keys(), [1, '10', 2]); // String alphabetical order: '1', '10', '2'
});

// ─── Performance Stress Test ───────────────────────────────

test('SkipList - stress test with 1000 inserts', () => {
  const sl = new SkipList();
  const values = new Map();
  
  // Insert 1000 random values
  for (let i = 0; i < 1000; i++) {
    const key = Math.floor(Math.random() * 10000);
    const value = `value${key}-${i}`;
    sl.insert(key, value);
    values.set(key, value);
  }
  
  assert.strictEqual(sl.size, values.size);
  
  // Verify all values can be found
  for (const [key, value] of values) {
    assert.strictEqual(sl.get(key), value);
  }
  
  // Test range queries work on large dataset
  const rangeResults = sl.range(100, 900);
  assert.ok(rangeResults.length > 0);
  assert.ok(rangeResults.length < 1000);
  
  // Verify structure is valid
  assert.strictEqual(sl.isValid(), true);
});

// ─── Constants and Utilities ───────────────────────────────

test('defaultCompare function', () => {
  assert.strictEqual(defaultCompare(1, 2), -1);
  assert.strictEqual(defaultCompare(2, 1), 1);
  assert.strictEqual(defaultCompare(1, 1), 0);
  
  assert.strictEqual(defaultCompare('a', 'b'), -1);
  assert.strictEqual(defaultCompare('b', 'a'), 1);
});

test('randomLevel function (sanity check)', () => {
  // Test that randomLevel returns valid levels
  for (let i = 0; i < 10; i++) {
    const level = randomLevel();
    assert.ok(Number.isInteger(level));
    assert.ok(level >= 0);
  }
});