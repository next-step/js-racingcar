import { Cars } from "./Cars";

export const Game = (function () {
  const roundHistory = [];
  let cars = [];

  const TOTAL_ROUNDS = 5;
  const ERROR_MESSAGE = Object.freeze({
    EMPTY: "빈 값으로는 프로그램이 동작할 수 없습니다.",
  });

  function validateUserInput(userInput) {
    if (!userInput) throw new Error(ERROR_MESSAGE.EMPTY);
  }

  function parseCarNames(userInput) {
    return userInput.split(",").map((carName) => carName.trim());
  }

  function setGame(userInput) {
    validateUserInput(userInput);

    const carNames = parseCarNames(userInput);

    cars = Cars.from(carNames);
  }

  function playGame() {
    let currentRound = 1;
    while (currentRound <= TOTAL_ROUNDS) {
      Cars.playOneRound(cars);
      currentRound += 1;

      roundHistory.push(Cars.getRoundRecord(cars));
    }
  }

  function getWinners() {
    const maxPosition = Math.max(...cars.map((car) => car.position));

    return cars.filter((car) => car.position === maxPosition);
  }

  function getGameResult() {
    const winners = getWinners();
    const winnerNames = winners.map((winner) => winner.name);

    return {
      roundHistory,
      winnerNames,
    };
  }

  return {
    setGame,
    playGame,
    getGameResult,
  };
})();
