import NumberMaker from '../NumberMaker.js';
import { AVALIABLE_RANDOM_NUMBER } from '../constants/index.js';

export const isMove = (carName) => {
  const randomNumber = NumberMaker.createRandomNumber(carName);
  return randomNumber >= AVALIABLE_RANDOM_NUMBER;
};
