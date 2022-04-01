import { duplicateTemplate } from '../utils/templateUtil.js';
import { TEMPLATE, ID, CLASS } from '../constants/selector.js';
const GameProcess = ({ carNames, playTimes }) => {
  const state = {
    carNames,
    playTimes,
  };

  const $el = duplicateTemplate(TEMPLATE.RACING_CAR_LIST);
  $el.id = ID.USER_RACING_CAR_PROCESS;

  const makeGameItemsElement = carName => {
    const $gameItemElement = duplicateTemplate(TEMPLATE.CAR_PLAYER_ITEM);
    $gameItemElement.id = `racing-${carName}`;
    $gameItemElement.querySelector(CLASS.CAR_PLAYER).textContent = carName;

    $gameItemElement.append(
      duplicateTemplate(TEMPLATE.RACING_CAR_ITEM_SPINNER)
    );
    return $gameItemElement;
  };

  const isStepForward = () => Math.floor(Math.random() * 10) > 4;

  const stepForward = carName => {
    $el
      .querySelector(`#racing-${carName}`)
      .querySelector(CLASS.FORWARD_ICON_AREA)
      .insertAdjacentElement(
        'afterend',
        duplicateTemplate(TEMPLATE.RACING_CAR_ITEM_FORWARD)
      );
  };

  const playRacingGame = () => {
    if (!state.playTimes) {
      document
        .querySelectorAll(CLASS.SPINNER)
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
        .querySelector(`#${ID.RACING_CAR_LIST_ITEMS}`)
        .insertAdjacentElement('beforeend', makeGameItemsElement(carName));
    });

    const $targetElement = document.getElementById('app');
    $targetElement.insertAdjacentElement('beforeend', $el);

    playRacingGame();
  };

  initProcess();
};

export default GameProcess;
