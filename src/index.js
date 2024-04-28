import { readLineAsync } from "./utils/readLineAsync.js";
import Car from "./domain/Car.js";

let carList = [];

async function play() {
  const PLAY_TRY = 5;
  const name = await readLineAsync(
    "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분)\n"
  );

  const carNames = name.split(",");
  carNames.forEach((name) => {
    const car = new Car(name.trim());
    carList.push(car);
  });

  console.log("\n");
  console.log("실행 결과");

  // 자동차 경주 진행
  for (let i = 0; i < PLAY_TRY; i++) {
    for (let j = 0; j < carList.length; j++) {
      carList[j].move();
    }
    for (let i = 0; i < carList.length; i++) {
      console.log(carList[i].name + " : " + "-".repeat(carList[i].position));
    }
    console.log("\n");
  }

  // 최종 실행 결과
  let maxPosition = Math.max(...carList.map((car) => car.position));
  let maxPositionCars = carList.filter((car) => car.position === maxPosition);
  let winner = maxPositionCars.map((car) => car.name);
  console.log(winner.join(", ") + "가 최종 우승했습니다.");
}

play();
