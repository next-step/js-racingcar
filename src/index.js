import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { Car } from "./domain/Car";
import { CarRace } from "./domain/CarRace";
import { ConsoleView } from "./view/consoleView";
import {
  CAR_NAME_MAX_LENGTH,
  CAR_NAME_MIN_LENGTH,
  RACE_MAX_CAR,
  RACE_MIN_CAR,
  RACE_MAX_LAP,
  RACE_MIN_LAP,
} from "./constants";

const parseCarNames = (rawCarNames) => {
  const carNames = rawCarNames
    .split(",")
    .map((carName) => carName.trim())
    .filter((carName) => carName);
  const uniqueCarNames = [...new Set(carNames)];
  return uniqueCarNames;
};

const play = async () => {
  const race = new CarRace();
  const view = new ConsoleView();

  // Get car names from the user
  const getCarNamePromptMessage = `\nInput car names to play (${RACE_MIN_CAR} ~ ${RACE_MAX_CAR} cars):\n`;
  while (true) {
    const userInput = await view.prompt(getCarNamePromptMessage);
    try {
      const carNames = parseCarNames(userInput);
      const cars = carNames.map((name) => new Car(name));
      race.setCars(cars);
      break;
    } catch (error) {
      view.print(`${error}`);
      view.print(
        `You can enter ${RACE_MIN_CAR} to ${RACE_MAX_CAR} car names, separated by ','.`
      );
      view.print(
        `Each name length can be between ${CAR_NAME_MIN_LENGTH} and ${CAR_NAME_MAX_LENGTH}`
      );
    }
  }

  // Get a number of laps from the user
  const getLapsPromptMessage = `\nInput number of laps to play (${RACE_MIN_LAP} ~ ${RACE_MAX_LAP}):\n`;
  while (true) {
    const userInput = await view.prompt(getLapsPromptMessage);
    try {
      const laps = parseInt(userInput);
      if (isNaN(laps)) {
        throw new Error("The input was not a integer.");
      }
      race.setLaps(laps);
      break;
    } catch (error) {
      view.print(`${error}`);
      view.print(
        `You can enter laps to play between ${RACE_MIN_LAP} and ${RACE_MAX_LAP}.`
      );
    }
  }

  // Start the race
  while (!race.isFinished) {
    race.start(1);
    const currentPositions = race.getCurrentPositions();
    view.print(`현재 경주 바퀴: ${race.currentLap}`);
    currentPositions.forEach(({ name, position }) =>
      view.print(`${name}: ${"-".repeat(position)}`)
    );
    view.print("");
  }

  // Print the result
  const winners = race.getWinnerNames();
  view.print(`${winners.join(", ")}가 최종 우승하였습니다.`);

  view.close();
};

play();
