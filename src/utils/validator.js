export function isAlphabet(str) {
  const regex = /^[a-zA-Z]*$/;
  return regex.test(str);
}

export function isDuplicated(arr) {
  return arr.find((item, index) => arr.indexOf(item) !== index);
}
