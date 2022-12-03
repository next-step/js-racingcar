export const arr = (num) => Array(num).fill(0);
export const getRandom = (min, max) => Math.floor((Math.random() * (max - min + 1)) + min);
export const arrDeepCopy = (arr) => JSON.parse(JSON.stringify(arr));