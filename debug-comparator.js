import { test } from 'node:test';
import assert from 'node:assert';
import { SkipList } from './src/index.js';

test('SkipList - custom comparator debug', () => {
  console.log('=== Testing Custom Comparator ===');
  
  // Create custom comparator for sorting by length (same as test)
  const lengthCompare = (a, b) => a.length - b.length;
  
  const sl = new SkipList({
    compare: lengthCompare
  });
  
  // Insert items in test order
  console.log('Inserting items in test order:');
  sl.insert('apple', 'fruit');
  console.log('After apple (5):', sl.toArray());
  
  sl.insert('banana', 'fruit');
  console.log('After banana (6):', sl.toArray());
  
  sl.insert('kiwi', 'fruit');
  console.log('After kiwi (4):', sl.toArray());
  
  sl.insert('orange', 'fruit');
  console.log('After orange (6):', sl.toArray());
  
  console.log('\nFinal state:');
  console.log('toArray():', sl.toArray());
  console.log('keys():', sl.keys());
  console.log('values():', sl.values());
  console.log('size:', sl.size);
  console.log('currentLevel:', sl.currentLevel);
  
  // Test the specific failing test
  console.log('\n=== Reproducing Test Case ===');
  const result = sl.toArray();
  const expected = [['kiwi', 'fruit'], ['apple', 'fruit'], ['banana', 'fruit'], ['orange', 'fruit']];
  console.log('Expected:', expected);
  console.log('Actual:', result);
  console.log('Arrays equal?', JSON.stringify(result) === JSON.stringify(expected));
  
  // Check individual items
  console.log('\n=== Checking Individual Items ===');
  console.log('has("kiwi"):', sl.has('kiwi'));
  console.log('has("apple"):', sl.has('apple'));
  console.log('has("banana"):', sl.has('banana'));
  console.log('has("orange"):', sl.has('orange'));
  
  console.log('find("kiwi"):', sl.find(k => k === 'kiwi'));
  console.log('find("apple"):', sl.find(k => k === 'apple'));
  console.log('find("banana"):', sl.find(k => k === 'banana'));
  console.log('find("orange"):', sl.find(k => k === 'orange'));
  
  // Debug the insertion of 'orange' specifically
  console.log('\n=== Debugging Orange Insertion ===');
  if (!sl.has('orange') || !sl.find(k => k === 'orange')) {
    console.log('Orange insertion failed, checking...');
    
    // Test the insertion step by step
    const testSl = new SkipList({ compare: lengthCompare });
    testSl.insert('apple', 'fruit');
    testSl.insert('banana', 'fruit');
    testSl.insert('kiwi', 'fruit');
    console.log('After first 3 items:', testSl.toArray());
    console.log('keys:', testSl.keys());
    console.log('values:', testSl.values());
    
    testSl.insert('orange', 'fruit');
    console.log('After inserting orange:', testSl.toArray());
    console.log('keys:', testSl.keys());
    console.log('values:', testSl.values());
    
    // Check if there are any issues with nodes at same length
    console.log('\nChecking for duplicate length nodes:');
    const nodes = testSl.toArray();
    const lengthGroups = {};
    nodes.forEach(([k, v]) => {
      const len = k.length;
      if (!lengthGroups[len]) lengthGroups[len] = [];
      lengthGroups[len].push(k);
    });
    Object.entries(lengthGroups).forEach(([len, words]) => {
      console.log(`Length ${len}:`, words);
    });
  }
});