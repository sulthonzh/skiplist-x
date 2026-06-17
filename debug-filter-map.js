import { test } from 'node:test';
import assert from 'node:assert';
import { SkipList } from './src/index.js';

test('SkipList - filter, map, reduce debug', () => {
  console.log('=== Testing filter, map, reduce ===');
  
  const sl = new SkipList();
  for (let i = 1; i <= 10; i++) {
    sl.insert(i, i * 10); // value = key * 10
  }
  
  console.log('All entries:', sl.toArray());
  
  // Filter
  const filtered = sl.filter(k => k % 2 === 0);
  console.log('Filtered:', filtered);
  console.log('Filtered.map(([k, v]) => v):', filtered.map(([k, v]) => v));
  
  // Map
  const mapped = sl.map(([k, v]) => v);
  console.log('Map result:', mapped);
  
  // Reduce
  const reduced = sl.reduce((acc, [k, v]) => acc + v, 0);
  console.log('Reduce result:', reduced);
  
  // Test the expected behavior
  assert.deepStrictEqual(filtered.map(([k, v]) => v), [20, 40, 60, 80, 100]);
  assert.deepStrictEqual(mapped, [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
  assert.strictEqual(reduced, 550);
});