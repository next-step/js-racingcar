export function isDuplicated(arr) {
  const itemSet = new Set();
  let hasDuplicate = false;

  arr.forEach((item) => {
    if (itemSet.has(item)) {
      hasDuplicate = true;
    } else {
      itemSet.add(item);
    }
  });

  return hasDuplicate;
}
