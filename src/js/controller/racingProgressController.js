import { startRacing } from '../view/racingProgressView.js';

export const progressRacing = (racingCarList) => {
  startRacingGame(racingCarList);

  let count = 1;
  const intervalId = setInterval(() => {
    const isFinishedRacing = count++ === Number(racingCarList.attemptCount) - 1;
    startRacingGame(racingCarList);
    if (isFinishedRacing) clearInterval(intervalId);
  }, 1000);
};

export const startRacingGame = (racingCarList) => {
  const carRacingProperty = racingCarList.attemptForward();
  startRacing(carRacingProperty);
  return carRacingProperty;
};
