import { duplicateTemplate } from '../utils/templateUtil.js';

const GameProcess = ({ carNames, playTimes }) => {
  const state = {
    carNames,
    playTimes,
  };

  // element
  const $el = duplicateTemplate('racing-car-list');
  $el.id = 'user-racing-car-process';
  const $targetElement = document.getElementById('app');

  const makeForwardElement = () => {
    return duplicateTemplate('racing-car-item-forward');
  };

  const makeSpinnerElement = () => {
    return duplicateTemplate('racing-car-item-spinner');
  };

  const makeGameItemsElement = carName => {
    const $gameItemElement = duplicateTemplate('car-player-item');
    $gameItemElement.id = `racing-${carName}`;
    $gameItemElement.querySelector('.car-player').textContent = carName;

    $gameItemElement.append(makeSpinnerElement());
    return $gameItemElement;
  };

  const isStepForward = () => Math.floor(Math.random() * 10) > 4;

  const stepForward = carName => {
    $el
      .querySelector(`#racing-${carName}`)
      .querySelector(`.forward-icon-area`)
      .insertAdjacentElement('afterend', makeForwardElement());
  };

  const playRacingGame = () => {
    if (!state.playTimes) {
      document
        .querySelectorAll('.spinner')
        .forEach(el => el.classList.add('hidden'));
      return;
    }

    state.playTimes -= 1;

    setTimeout(() => {
      state.carNames.forEach(
        carName => isStepForward() && stepForward(carName)
      );

      requestAnimationFrame(playRacingGame);
    }, 1000);
  };

  const initProcess = () => {
    state.carNames.forEach(carName => {
      $el
        .querySelector('#racing-car-list-items')
        .insertAdjacentElement('beforeend', makeGameItemsElement(carName));
    });

    playRacingGame();
    $targetElement.insertAdjacentElement('beforeend', $el);
  };

  initProcess();
};

export default GameProcess;
