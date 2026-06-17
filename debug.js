import { SkipList } from './src/index.js';

const sl = new SkipList();
for (let i = 1; i <= 10; i++) {
  sl.insert(i, i * 10); // value = key * 10
}

console.log('All entries:', sl.toArray());
console.log('Filter test:');
const filtered = sl.filter(k => k % 2 === 0);
console.log('Filtered result:', filtered);
console.log('Filtered type:', typeof filtered, Array.isArray(filtered));
console.log('Trying to map...');
try {
  const mapped = filtered.map(([k, v]) => v);
  console.log('Mapped result:', mapped);
} catch (e) {
  console.log('Error:', e.message);
  console.log('First element:', filtered[0]);
  console.log('First element type:', typeof filtered[0]);
  if (Array.isArray(filtered[0])) {
    console.log('First element is array:', filtered[0]);
  }
}