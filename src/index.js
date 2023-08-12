import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { Car } from "./Car";
import { CarRace } from "./CarRace";
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
  const rl = readline.createInterface({ input, output });

  // Get car names from the user
  const getCarNamePromptMessage = `\nInput car names to play (${RACE_MIN_CAR} ~ ${RACE_MAX_CAR} cars):\n`;
  while (true) {
    const userInput = await rl.question(getCarNamePromptMessage);
    try {
      const carNames = parseCarNames(userInput);
      const cars = carNames.map((name) => new Car(name));
      race.setCars(cars);
      break;
    } catch (error) {
      console.log(`${error}`);
      console.log(
        `You can enter ${RACE_MIN_CAR} to ${RACE_MAX_CAR} car names, separated by ','.`
      );
      console.log(
        `Each name length can be between ${CAR_NAME_MIN_LENGTH} and ${CAR_NAME_MAX_LENGTH}`
      );
    }
  }

  // Get a number of laps from the user
  const getLapsPromptMessage = `\nInput number of laps to play (${RACE_MIN_LAP} ~ ${RACE_MAX_LAP}):\n`;
  while (true) {
    const userInput = await rl.question(getLapsPromptMessage);
    try {
      const laps = parseInt(userInput);
      if (isNaN(laps)) {
        throw new Error("The input was not a integer.");
      }
      race.setLaps(laps);
      break;
    } catch (error) {
      console.log(`${error}`);
      console.log(
        `You can enter laps to play between ${RACE_MIN_LAP} and ${RACE_MAX_LAP}.`
      );
    }
  }

  rl.close();

  // Start the race
  race.start();
};

play();
