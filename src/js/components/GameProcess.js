const GameProcess = ({ carNames, playTimes }) => {
  // element
  const $templateElement = document.getElementById('racing-car-list');
  const $targetElement = document.getElementById('app');
  const importedNode = document.importNode($templateElement.content, true);
  const $el = importedNode.firstElementChild;
  $el.id = 'user-racing-car-process';

  const makeGameItems = carName => {
    const $gameItem = document.createElement('div');
    $gameItem.innerHTML = `
        <div class="mr-2">
            <div class="car-player">${carName}</div>
            <div class="forward-icon mt-2">⬇️️</div>
            <div class="d-flex justify-center mt-3">
              <div class="relative spinner-container">
                <span class="material spinner"></span>
              </div>
            </div>
          </div>`;
    return $gameItem;
  };

  carNames.forEach(carName => {
    $el
      .querySelector('#racing-car-list-items')
      .insertAdjacentElement('beforeend', makeGameItems(carName));
  });

  $targetElement.insertAdjacentElement('beforeend', $el);
};

export default GameProcess;
