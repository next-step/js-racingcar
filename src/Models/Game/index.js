import {
  CarNamesIsEmptyError,
  TotalRoundsIsEmptyError,
  TotalRoundsNotNumberError,
  TotalRoundsNotIntegerError,
  TotalRoundsNotPositiveError,
} from "./errors";
import { createCars } from "../Cars";
import RandomStrategy from "../MoveStrategy/RandomStrategy";

export const createGame = (carNamesInput, roundsInput) => {
  const roundHistory = [];
  let cars = [];
  let totalRounds = 0;
  const { from, playOneRound, getRoundRecord } = createCars();

  function isEmpty(value) {
    return (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim() === "")
    );
  }

  function validateUserInput(input) {
    if (isEmpty(input)) throw new CarNamesIsEmptyError();
  }

  function validateRoundsInput(input) {
    if (isEmpty(input)) throw new TotalRoundsIsEmptyError();

    const round = Number(input);
    if (Number.isNaN(round)) throw new TotalRoundsNotNumberError();
    if (!Number.isInteger(round)) throw new TotalRoundsNotIntegerError();

    const ONE = 1;
    if (round < ONE) throw new TotalRoundsNotPositiveError();
  }

  function parseCarNames(userInput) {
    return userInput.split(",").map((carName) => carName.trim());
  }

  function setGame(carNamesInput, roundsInput) {
    validateUserInput(carNamesInput);

    validateRoundsInput(roundsInput);

    const carNames = parseCarNames(carNamesInput);

    cars = from(carNames);

    totalRounds = Number(roundsInput);
  }

  function playGame(moveStrategies = cars.map(() => new RandomStrategy())) {
    while (totalRounds--) {
      playOneRound(cars, moveStrategies);

      roundHistory.push(getRoundRecord(cars));
    }
  }

  function getWinners() {
    const maxPosition = Math.max(
      ...cars.map((car) => car.getRecord().position)
    );

    return cars.filter((car) => car.getRecord().position === maxPosition);
  }

  function getGameResult() {
    const winners = getWinners();
    const winnerNames = winners.map((car) => car.getRecord().name);

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
};
