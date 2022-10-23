import State from '../model/state.js';

export default function showPlayer(players) {
  const racingWrapper = document.getElementById('racing-wrapper');
  const racingInnerWrapper = document.querySelector('.racing-inner-wrapper');

  let temp = ``;

  players.forEach(it => {
    temp += `<div class="mr-2 car-player-wrap">
              <div class="car-player" data-forward-count='0'>${it}</div>
            </div>`;
  });

  racingInnerWrapper.innerHTML = temp;
  racingWrapper.style.display = 'block';
}