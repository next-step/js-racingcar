import { duplicateTemplate } from '../utils/templateUtil.js';
import { TEMPLATE, ID, CLASS } from '../constants/selector.js';

const GameProcess = ({ carNames, playTimes }) => {
  let state = {
    playTimes,
  };

  const $currentElement = duplicateTemplate(TEMPLATE.RACING_CAR_LIST_SECTION);
  $currentElement.id = ID.USER_RACING_CAR_PROCESS;

  const updateState = newState => Object.assign(state, newState);

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
    $currentElement
      .querySelector(`#racing-${carName} ${CLASS.FORWARD_ICON_AREA}`)
      .insertAdjacentElement(
        'afterend',
        duplicateTemplate(TEMPLATE.RACING_CAR_ITEM_FORWARD)
      );
  };

  const playRacingGame = () => {
    if (!state.playTimes) {
      removeSpinnerWillChangeHint();
      return;
    }

    updateState({ playTimes: (state.playTimes -= 1) });

    setTimeout(() => {
      carNames.forEach(carName => isStepForward() && stepForward(carName));

      requestAnimationFrame(playRacingGame);
    }, 1000);
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
    carNames.forEach(carName => {
      $currentElement
        .querySelector(`#${ID.RACING_CAR_LIST_ITEMS}`)
        .insertAdjacentElement('beforeend', makeGameItemsElement(carName));
    });

    const $targetElement = document.getElementById('app');
    $targetElement.insertAdjacentElement('beforeend', $currentElement);
    setSpinnerWillChangeHint();
    playRacingGame();
  };

  initProcess();
};

export default GameProcess;
