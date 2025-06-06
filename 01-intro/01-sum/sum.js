export default function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('a and b must be numbers');
  }

  return a + b;
}
