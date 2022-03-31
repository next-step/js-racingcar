export const inputCarNames = event => {
  event.preventDefault();

  if (!event.target.matches('[data-props="car-names-confirm-button"]')) return;
  console.log('🥰inputCarNames');
};

export const inputGameTryCount = event => {
  event.preventDefault();

  if (!event.target.matches('[data-props="game-try-count-confirm-button"]')) return;
  console.log('😳inputGameTryCount');
};
