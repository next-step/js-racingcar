import {
  alertWinners,
  removeLoadingIconOfCar,
  renderGameResult,
  renderLoadingIconOfCar,
  renderRacingIcon,
} from '../view/racingProgressView.js';

export const progressRacing = (racingCarList) => {
  renderLoadingIconOfCar();

  let count = 0;

  const intervalId = setInterval(() => {
    const isFinishedRacing = count++ === Number(racingCarList.attemptCount) - 1;

    startRacingGame(racingCarList);

    if (isFinishedRacing) {
      const winnerList = racingCarList.pickWinner();
      removeLoadingIconOfCar();
      renderGameResult(winnerList);
      clearInterval(intervalId);
      setTimeout(() => alertWinners(), 2000);
    }
  }, 1000);
};

export const startRacingGame = (racingCarList) => {
  const carRacingProperty = racingCarList.attemptForward();
  renderRacingIcon(carRacingProperty);
};
