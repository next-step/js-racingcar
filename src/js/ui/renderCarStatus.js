import isOverThresholdScore from '../model/isOverThresholdScore.js';
import printArrow from './printArrow.js';

export default function renderCarStatus(record) {
  const cars = document.querySelectorAll('.car-player');

  cars.forEach((ele) => {
    const { carName } = ele.dataset;
    if (!isOverThresholdScore(record[carName])) return;

    printArrow(ele);
  });
}
