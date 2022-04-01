const GameProcess = ({ carNames, playTimes }) => {
  const state = {
    carNames,
    playTimes,
  };

  // element
  const $templateElement = document.getElementById('racing-car-list');
  const $targetElement = document.getElementById('app');
  const importedNode = document.importNode($templateElement.content, true);
  const $el = importedNode.firstElementChild;
  $el.id = 'user-racing-car-process';

  const makeForwardElement = () => {
    const $templateElement = document.getElementById('racing-car-item-forward');
    const importedNode = document.importNode($templateElement.content, true);
    return importedNode.firstElementChild;
  };

  const makeSpinnerElement = () => {
    const $templateElement = document.getElementById('racing-car-item-spinner');
    const importedNode = document.importNode($templateElement.content, true);
    return importedNode.firstElementChild;
  };

  const makeGameItemsElement = carName => {
    const $gameItemTemplate = document.getElementById('car-player-item');
    const importedGameItem = document.importNode(
      $gameItemTemplate.content,
      true
    );

    const $gameItemElement = importedGameItem.firstElementChild;
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
