import { getRandomNumber } from "../utils/getRandomNumber";

export const attemptCount = (cars, count) => {
  console.log("시도할 회수는 몇회인가요?");
  if (count < 0) {
    throw new Error("0 이상의 숫자를 입력해주세요!");
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
