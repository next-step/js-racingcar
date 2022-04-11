/**
 * @param {string[]} winners
 * @param {{onResetButtonClick: Function}} options
 */
export function RaceResultComponent(winners, {onResetButtonClick}) {
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
