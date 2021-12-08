export const validateCarName = (carName) => {
  if (carName === '') throw Error('자동차 이름을 입력하세요.');
  if (carName.length > 5) throw Error('자동차의 이름은 5글자를 넘을 수 없습니다.');
};