import { test } from 'node:test';
import assert from 'node:assert';
import { SkipList } from './src/index.js';

test('SkipList - filter, map, reduce specific', () => {
  const sl = new SkipList();
  for (let i = 1; i <= 10; i++) {
    sl.insert(i, i * 10); // value = key * 10
  }
  
  console.log('Before filter:');
  console.log('sl.toArray():', sl.toArray());
  
  // Filter
  console.log('Calling filter...');
  const filtered = sl.filter(k => k % 2 === 0);
  console.log('Filtered result:', filtered);
  console.log('Filtered type:', typeof filtered);
  console.log('Is array:', Array.isArray(filtered));
  console.log('Length:', filtered.length);
  console.log('First element:', filtered[0]);
  console.log('First element type:', typeof filtered[0]);
  
  // Try to map
  console.log('Calling map...');
  try {
    const mapped = filtered.map(([k, v]) => v);
    console.log('Mapped result:', mapped);
    assert.deepStrictEqual(mapped, [20, 40, 60, 80, 100]);
    console.log('✅ Filter test passed');
  } catch (e) {
    console.log('❌ Filter test failed:', e.message);
    throw e;
  }
  
  // Map
  console.log('Testing full map...');
  try {
    const mapped2 = sl.map(([k, v]) => v);
    console.log('Full map result:', mapped2);
    assert.deepStrictEqual(mapped2, [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
    console.log('✅ Map test passed');
  } catch (e) {
    console.log('❌ Map test failed:', e.message);
    throw e;
  }
  
  // Reduce
  console.log('Testing reduce...');
  try {
    const reduced = sl.reduce((acc, k, v) => acc + v, 0);
    console.log('Reduce result:', reduced);
    assert.strictEqual(reduced, 550);
    console.log('✅ Reduce test passed');
  } catch (e) {
    console.log('❌ Reduce test failed:', e.message);
    throw e;
  }
});