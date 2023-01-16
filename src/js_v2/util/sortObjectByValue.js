export default function sortObjectByValue (obj, option = 'asc') {
  return Object.entries(obj).sort(([, a], [, b]) => option === 'asc' ? a - b: b - a);
}