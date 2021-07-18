import { getRandom } from './helper.js';

/**
 * cars: 차량들
 * 랜덤한 값 0~3 움직이지 않음,
 * 랜덤한 값 4~9 움직임
 */
export const determineCarMove = (cars) => {
  return Array(cars.length)
    .fill(0)
    .map(() => {
      return getRandom() >= 3 ? '' : 'forward';
    });
};

export const determineWinner = (cars) => {
  const carStatesL = cars.map(
    ({ carStates }) => carStates.filter((state) => state === 'forward').length
  );
  const max = Math.max(...carStatesL);
  const indices = [];
  let index = carStatesL.indexOf(max);
  while (index !== -1) {
    indices.push(index);
    index = carStatesL.indexOf(max, index + 1);
  }
  return indices.map((idx) => cars[idx].carName);
};

export const filterCarName = (str) => {
  return str
    .split(',')
    .map((carName) => carName.trim())
    .filter((carName) => carName !== '');
};

export const isVaildCarName = (carNames) => {
  for (const carName of carNames) {
    if (carName.length > 5) return false;
  }
  return true;
};

export const canPlayGame = (cars, time) => {
  return time >= 2 && cars.length >= 2;
};
