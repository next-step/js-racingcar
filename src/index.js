import { isValidationName } from "./domain/isValidationName";
import { getRandomNumber } from "./utils/getRandomNumber";

export const startRacingGame = (name) => {
  if (!isValidationName(name)) {
    console.log("잘못된 정보를 입력하여 게임을 종료합니다.");
  }
  const carList = name.split(",");

  console.log(`${carList}`);

  const cars = carList.map((name) => {
    return { name, position: 0 };
  });

  for (let i = 0; i < 5; i++) {
    cars.forEach((car) => {
      if (getRandomNumber() > 3) car.position++;
      console.log(`${car.name} : ${"-".repeat(car.position)}`);
    });
    console.log("\n");
  }

  const maxPosition = Math.max(...cars.map((car) => car.position));
  const winners = cars
    .filter((car) => car.position === maxPosition)
    .map((car) => car.name);
  console.log(`${winners.join(", ")}가 최종 우승했습니다.`);

  return winners;
};
