export const last = (arr) => arr.at(-1);

export const range = (limit) => Array.from({ length: limit }, (_, i) => i + 1);

export const splitStringWithComma = (value) =>
  value?.split(',').map((v) => v.trim());

export const generateRandomNumberUnder = (max = 10) =>
  Math.floor(Math.random() * max);
