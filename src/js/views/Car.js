import { DOM, GAME_RESULT } from '../constants.js';

export function carGameResultView(name, gameResult) {
  return String.raw`
    <div data-car-name="${name}" class="mr-2">
      <div class="car-player">${name}</div>
      ${gameResult.map(result => (result === GAME_RESULT.ADVANCE ? carAdvanceView() : '')).join('')}
    </div>
  `;
}

export function carAdvanceView() {
  return String.raw`<div class="${DOM.CAR_FORWARD_ICON_CLASS} mt-2">⬇️️</div>`;
}
