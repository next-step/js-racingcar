function CarPlayerStep(playerStep) {
  if (playerStep) {
    return '<div class="forward-icon mt-2">⬇️️</div>';
  }

  return `
    <div class="d-flex justify-center mt-3">
      <div class="relative spinner-container">
        <span class="material spinner"></span>
      </div>
    </div>
  `;
}

export default function CarPlayer(player, playerSteps) {
  return `
    <div class="mr-2">
      <div class="car-player">${player}</div>
      ${playerSteps.map(CarPlayerStep).join('')}
    </div>
  `;
}
