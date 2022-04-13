export const isNull = data => data === null;

export const isDuplicatedArray = target => new Set(target).size !== target.length;
