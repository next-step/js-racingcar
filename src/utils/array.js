export const isDuplicateArray = (array) => new Set(array).size !== array.length;
export const isTruthyArray = (array) => array.every(Boolean);
