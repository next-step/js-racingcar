import { NUM } from './constants.js';

export function isInvalidCarName(name) {
  const carName = name.trim();

  const isEmptyString = !carName;
  const isMaxLength = carName.length > NUM.MAX_LENGTH;

  return isEmptyString || isMaxLength;
}

export function isOverMaxCount(count) {
  return count > NUM.MAX_COUNT;
}

export function isUnderMinCount(count) {
  return count <= NUM.MIN_COUNT;
}

export function isAdvance(num) {
  return num >= NUM.ADVANCE_STANDARD;
}
