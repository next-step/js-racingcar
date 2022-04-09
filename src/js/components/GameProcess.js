import { duplicateTemplate } from '../utils/templateUtil.js';
import { TEMPLATE, ID, CLASS } from '../constants/selector.js';
import { MILLISECONDS } from '../constants/unit.js';

const GameProcess = ({ state, consumeTime }) => {
  const $currentElement = duplicateTemplate(TEMPLATE.RACING_CAR_LIST_SECTION);
  $currentElement.id = ID.USER_RACING_CAR_PROCESS;

  const makeGameItemsElement = carName => {
    const $gameItemElement = duplicateTemplate(TEMPLATE.CAR_PLAYER_ITEM);
    $gameItemElement.id = `racing-${carName}`;
    $gameItemElement.querySelector(CLASS.CAR_PLAYER).textContent = carName;
    $gameItemElement.append(
      duplicateTemplate(TEMPLATE.RACING_CAR_ITEM_SPINNER)
    );
    setSpinnerWillChangeHint();
    return $gameItemElement;
  };

  const stepForward = carName => {
    $currentElement
      .querySelector(`#racing-${carName} ${CLASS.FORWARD_ICON_AREA}`)
      .insertAdjacentElement(
        'afterend',
        duplicateTemplate(TEMPLATE.RACING_CAR_ITEM_FORWARD)
      );
  };

  const playRacingGame = () => {
    if (!state.leftPlayTime) {
      removeSpinnerWillChangeHint();
      return;
    }

    consumeTime();

    for (const [key, value] of Object.entries(state.racingCarList)) {
      value[state.leftPlayTime] && stepForward(key);
    }

    setTimeout(() => {
      requestAnimationFrame(playRacingGame);
    }, MILLISECONDS);
  };

  const setSpinnerWillChangeHint = () => {
    const $spinner = $currentElement.querySelectorAll(CLASS.SPINNER);
    $spinner.forEach($el => {
      $el.style.willChange = 'transform, opacity';
      $el.style.opacity = 1;
    });
  };

  const removeSpinnerWillChangeHint = () => {
    const $spinner = $currentElement.querySelectorAll(CLASS.SPINNER);
    $spinner.forEach($el => {
      $el.style.willChange = 'auto';
      $el.style.opacity = 0;
    });
  };

  const initProcess = () => {
    state.carNames.forEach(carName => {
      $currentElement
        .querySelector(`#${ID.RACING_CAR_LIST_ITEMS}`)
        .insertAdjacentElement('beforeend', makeGameItemsElement(carName));
    });

    const $targetElement = document.getElementById('app');
    $targetElement.insertAdjacentElement('beforeend', $currentElement);
    playRacingGame();
  };

  initProcess();
};

export default GameProcess;
