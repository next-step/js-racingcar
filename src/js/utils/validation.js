export function isInvalidCarName(name) {
  const carName = name.trim();

  const isEmptyString = !carName;
  const isMaxLength = carName.length > 5;

  return isEmptyString || isMaxLength;
}

export function isOverMaxCount(count) {
  return count > 20;
}

export function isUnderMinCount(count) {
  return count <= 0;
}

export function isStop(num) {
  return num <= 3;
}

export function isAdvance(num) {
  return num >= 4;
}
