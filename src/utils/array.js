export const isDuplicateArray = (arr) => new Set(arr).size !== arr.length;
export const isTruthyArray = (array) => array.every((item) => !!item);
