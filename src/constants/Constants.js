const car = Object.freeze({
  nameLength: 5,
  initialPosition: 0,
  moveDistance: 1,
  minRandomNumber: 0,
  maxRandomNumber: 9,
});

const racingGame = Object.freeze({
  round: 5,
});

const CONSTANTS = Object.freeze({
  car,
  racingGame,
});

export default CONSTANTS;
