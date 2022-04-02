export const isNil = value => value == null;

export const isEmpty = data => {
  if (data instanceof Array) return data.length === 0;
  if (data instanceof Set || data instanceof Map) return data.size === 0;
  if (data.constructor === Object) return Object.keys(data).length === 0;
  if (typeof data === 'string') return data === '';
  if (typeof data === 'number') return data === 0;

  return false;
};

export const isFirstChar = (target, char) => target.charAt(0) === char;

export const isLastChar = (target, char) => target.at(-1) === char;

export const isDuplicatedArray = target => new Set(target).size !== target.length;

export const isInteger = target => {
  if (isEmpty(target) || isNaN(target)) return false;
  if (!Number.isInteger(Number(target))) return false;
  return true;
};

export const isDOMElement = $element => $element instanceof Element;
