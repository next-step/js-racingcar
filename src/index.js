import { isValidationName } from "./domain/isValidationName";
import { attemptCount } from "./domain/attemptCount";

export const startRacingGame = (name, count) => {
  console.log(
    "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분)."
  );
  if (!isValidationName(name)) {
    throw new Error("잘못된 정보를 입력하여 게임을 종료합니다.");
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
