export function drawCars(names) {
  return `<div class="mt-4 d-flex">
            ${names
              .map(
                (name) =>
                  `<div class="mr-2" aria-label="${name}"><div class="car-player">${name}</div></div>`
              )
              .join("")}
        </div>`;
}

export const forwardIcon = `<div class="forward-icon mt-2">⬇️️</div>`;

/**
 * @param {string[]} winners
 * @param {{onResetButtonClick: Function}} options
 */
export function TemplateRaceResult(winners, { onResetButtonClick }) {
    const fragment = document.createDocumentFragment();
    const $raceResultContainer = document.createElement('div');

    $raceResultContainer.innerHTML = `<div>
      <h2>🏆 최종 우승자: <span class="winners">${winners.join(', ')}</span> 🏆</h2>
      <div class="d-flex justify-center">
        <button type="button" class="btn btn-cyan">다시 시작하기</button>
      </div>
    </div>`;
    $raceResultContainer.addEventListener('click', (e) => {
        if (e.target.matches('button')) {
            onResetButtonClick();
        }
    });
    fragment.appendChild($raceResultContainer);
    return fragment;
}
