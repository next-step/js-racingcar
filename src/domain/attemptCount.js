import { getRandomNumber } from "../utils/getRandomNumber";
import {
  TRY_COUNT_MESSAGE,
  ZERO_UP_INPUT_MESSAGE,
} from "../constants/racingGame";

export const attemptCount = (cars, count) => {
  console.log(TRY_COUNT_MESSAGE);

  if (count < 0) {
    throw new Error(ZERO_UP_INPUT_MESSAGE);
  }

  console.log(`${count}`);
  for (let i = 0; i < count; i++) {
    cars.forEach((car) => {
      if (getRandomNumber() > 3) car.position++;
      console.log(`${car.name} : ${"-".repeat(car.position)}`);
    });
    console.log("\n");
  }

  return cars;
};
