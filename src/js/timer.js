import { removeAllSpinners } from './utils.js';
import { DELAY } from './constants.js';

const getIntervalTimer = (createTemplate, calculate, cars, carPlayers, coin) => {
  let count = 1;

  const timeoutId = setInterval(() => {
    carPlayers.forEach((carPlayer) => {
      if (calculate.isForwardCondition()) {
        carPlayer.insertAdjacentHTML('afterend', createTemplate.createForwardTemplate());
      }
    });

    // eslint-disable-next-line no-plusplus
    if (count++ === coin) {
      clearInterval(timeoutId);
      removeAllSpinners(cars);
    }
  }, DELAY);
};

export { getIntervalTimer };
