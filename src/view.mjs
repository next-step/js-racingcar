import { Race, Car } from "./index.mjs";
import Readline from "readline";

const readline = Readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(
  "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n",
  (names) => {
    const nameList = names.split(",");
    let cars;
    try {
      cars = nameList.map((name) => new Car(name));
    } catch (error) {
      console.log(error.message);
      readline.close();
      return;
    }
    const race = new Race(cars);
    console.log("\n");
    console.log("실행결과");
    cars.forEach((car) => {
      console.log(`${car.getName()} : ${"-".repeat(car.getPosition())}`);
    });
    console.log("\n");
    for (const progress of race.start()) {
      progress.map((car) => {
        console.log(`${car.getName()} : ${"-".repeat(car.getPosition())}`);
      });
      console.log("\n");
    }

    const result = race.getResult();
    if (result.length > 0) {
      console.log(
        `${result.map((car) => car.getName()).join(",")}가 최종 우승했습니다.`
      );
    } else {
      console.log("그 누구도 최종 우승하지 못했습니다.");
    }

    readline.close();
  }
);
