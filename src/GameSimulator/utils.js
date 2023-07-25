import { MAX_CAR_NAME_LENGTH } from './constants.js';

export const validateCarName = (carName) => {
  if (carName.length > MAX_CAR_NAME_LENGTH) {
    throw new Error(`자동차 이름은 최대 ${MAX_CAR_NAME_LENGTH}글자 입니다.`);
  }
};
