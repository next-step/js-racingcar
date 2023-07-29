export function getRandomNumberInRange(start, end) {
  const range = end - start + 1;
  return Math.floor(Math.random() * range) + start;
}
