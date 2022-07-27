export const getRacingResult = (cars) => {
  return cars.map(() => {
    const randomNumber = Math.floor(Math.random() * 10);
    return randomNumber > 3
  })
};

export const runRacingGame = (attemptNumber, cars, renderRacingGame) => {
  Array.from({ length: attemptNumber }, () => {
    const racingResult = getRacingResult(cars);
    renderRacingGame(racingResult);
  })
}
