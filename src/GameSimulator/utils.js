export const validateCarName = (carName) => {
  if (carName.length > 5) {
    throw new Error('자동차 이름은 최대 5글자 입니다.');
  }
};
