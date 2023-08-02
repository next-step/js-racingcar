import { isValidationName } from "./domain/isValidationName";
import { attemptCount } from "./domain/attemptCount";
import {
  RACING_EXPLANATION_MESSAGE,
  WRONG_INFO_INPUT_GAME_END_MESSAGE,
} from "./constants/racingGame";

export const startRacingGame = (name, count) => {
  console.log(RACING_EXPLANATION_MESSAGE);
  if (!isValidationName(name)) {
    throw new Error(WRONG_INFO_INPUT_GAME_END_MESSAGE);
  }
  const carList = name.split(",");

  console.log(`${carList}`);

  const cars = carList.map((name) => {
    return { name, position: 0 };
  });

  attemptCount(cars, count);

  const maxPosition = Math.max(...cars.map((car) => car.position));
  const winners = cars
    .filter((car) => car.position === maxPosition)
    .map((car) => car.name);
  console.log(`${winners.join(", ")}가 최종 우승했습니다.`);

  return winners;
};
