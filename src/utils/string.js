export function toArray(str, seperator) {
  return str.split(seperator);
}

export function isAlphabet(str) {
  const regex = /^[a-zA-Z]*$/;
  return regex.test(str);
}
