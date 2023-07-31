export const isStringOverLength = (value, length) => {
  return value.toString().length > length;
};

export const isMoreThanNumber = (value, number) => {
  if (typeof value !== 'number') {
    return false;
  }

  return value >= number;
};

export const getStringFromArray = (array) => {
  if (!Array.isArray(array)) {
    throw new Error('인자는 배열만 가능합니다.');
  }
  return array.join(', ');
};

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

export const isEmpty = (value) => {
  return value === null || value === undefined;
};
