const carListTemplate = (name) => `
  <li class="mr-2 competition-list-item">
    <div class="car-player">${name}</div>
    <div class="d-flex justify-center items-center mt-3">
      <div class="relative spinner-container">
        <span class="material spinner"></span>
      </div>
    </div>
  </li>
  `;

const racingWinnerTemplate = (winners) => `
  🏆 최종 우승자: ${winners} 🏆
  `;

const carForwardTemplate = `
  <div class="forward-icon mt-2">⬇️️</div>
  `;

export { carListTemplate, racingWinnerTemplate, carForwardTemplate };
