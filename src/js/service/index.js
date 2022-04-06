import { ERROR } from '../constants/index.js';

const validName = (name) => {
  const notBlankName = name.replace(/\s/g, '');
  if (!notBlankName) {
    return ERROR.NAME_EMPTY;
  }

  if (name.length > 5) {
    return ERROR.NAME_MAX_LENGTH;
  }

  return null;
};

export const validNames = (names) => {
  const validNamesArr = names.map((name) => validName(name)).filter((name) => name);

  if (validNamesArr.length > 0) return { errorMessage: validNamesArr[0] };

  return { errorMessage: null };
};
