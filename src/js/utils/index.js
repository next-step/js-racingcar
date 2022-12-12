export const sortObjectByValue = (obj, option = 'asc') =>
  Object.entries(obj).sort(([, a], [, b]) => (option === 'asc' ? a - b : b - a));
