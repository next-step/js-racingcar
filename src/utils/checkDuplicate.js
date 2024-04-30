export const checkDuplicate = arr => {
  return arr.length !== new Set(arr).size;
};
