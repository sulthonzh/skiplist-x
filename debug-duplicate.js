import { test } from 'node:test';
import assert from 'node:assert';
import { SkipList } from './src/index.js';

test('SkipList - duplicate inserts debug', () => {
  console.log('=== Testing Duplicate Inserts ===');
  
  const sl = new SkipList();
  console.log('Initial size:', sl.size);
  
  sl.insert(1, 'first');
  console.log('After insert(1, "first"): size =', sl.size, 'keys =', sl.keys());
  
  sl.insert(1, 'second'); // should update
  console.log('After insert(1, "second"): size =', sl.size, 'keys =', sl.keys());
  console.log('get(1):', sl.get(1));
  
  console.log('\nExpected: size = 1, get(1) = "second"');
  console.log('Actual: size =', sl.size, ', get(1) =', sl.get(1));
  
  assert.strictEqual(sl.size, 1);
  assert.strictEqual(sl.get(1), 'second');
});