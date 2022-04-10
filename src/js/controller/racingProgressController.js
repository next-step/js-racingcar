import { startRacing } from '../view/racingProgressView.js';

export const progressRacing = (racingCarList) => {
  const carDto = racingCarList.attemptForward();
  startRacing(carDto);

  let count = 1;
  const intervalId = setInterval(() => {
    const carDto = racingCarList.attemptForward();
    startRacing(carDto);
    if (count++ === Number(racingCarList.attemptCount) - 1) clearInterval(intervalId);
  }, 1000);
};
