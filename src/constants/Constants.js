const move = Object.freeze({
  maxNumber: 9,
  minNumber: 0,
  threshold: 4,
  distance: 1,
  symbol: '-',
});

const car = Object.freeze({
  maxNameLength: 5,
  initialPosition: 0,
  move,
});

const racingGame = Object.freeze({
  initialRound: 0,
  roundConfig: 5,
});

const CONSTANTS = Object.freeze({
  emptyString: '',
  car,
  racingGame,
});

export default CONSTANTS;
