import { DOM, GAME } from '../constants.js';

export function carGameResultView(name, gameResult) {
  return String.raw`
    <div class="mr-2">
      <div class="car-player">${name}</div>
      ${gameResult.map(result => (result === GAME.ADVANCE ? carAdvanceView() : '')).join('')}
    </div>
  `;
}

function carAdvanceView() {
  return String.raw`<div class="${DOM.CAR_FORWARD_ICON_CLASS} mt-2">⬇️️</div>`;
}
