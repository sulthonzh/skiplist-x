import { test } from 'node:test';
import assert from 'node:assert';
import { SkipList } from './src/index.js';

test('SkipList - custom comparator specific debug', () => {
  console.log('=== Testing Custom Comparator Insertion Order ===');
  
  // Create custom comparator for sorting by length
  const lengthCompare = (a, b) => a.length - b.length;
  
  const sl = new SkipList({
    compare: lengthCompare
  });
  
  console.log('Inserting in order: apple (5), banana (6), kiwi (4), orange (6)');
  
  sl.insert('apple', 'fruit');
  console.log('After apple:', sl.keys());
  
  sl.insert('banana', 'fruit');
  console.log('After banana:', sl.keys());
  
  sl.insert('kiwi', 'fruit');
  console.log('After kiwi:', sl.keys());
  
  sl.insert('orange', 'fruit');
  console.log('After orange:', sl.keys());
  
  console.log('\nFinal keys:', sl.keys());
  console.log('Expected: ["kiwi", "apple", "banana", "orange"]');
  console.log('Actual:  ', sl.keys());
  
  // Test the insertion of 'orange' more specifically
  console.log('\n=== Debugging orange insertion ===');
  
  const testSl = new SkipList({ compare: lengthCompare });
  testSl.insert('apple', 'fruit');
  testSl.insert('banana', 'fruit');
  testSl.insert('kiwi', 'fruit');
  console.log('Before orange:', testSl.keys());
  
  // Manually trace where 'orange' should be inserted
  const key = 'orange';
  const expectedPos = 'banana'; // Should be inserted after banana
  
  console.log('Looking for insertion point for orange (length 6)');
  console.log('banana also has length 6, so orange should come after banana');
  
  testSl.insert('orange', 'fruit');
  console.log('After orange:', testSl.keys());
  
  // Check if 'orange' is actually in the list
  console.log('has("orange"):', testSl.has('orange'));
  console.log('find("orange"):', testSl.find(k => k === 'orange'));
  
  // Try different insertion orders
  console.log('\n=== Testing different insertion order ===');
  const testSl2 = new SkipList({ compare: lengthCompare });
  testSl2.insert('orange', 'fruit');
  testSl2.insert('banana', 'fruit');
  console.log('Inserted orange then banana:', testSl2.keys());
  
  testSl2.insert('apple', 'fruit');
  testSl2.insert('kiwi', 'fruit');
  console.log('Final order:', testSl2.keys());
});