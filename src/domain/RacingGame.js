import { generateRandomNumber } from "../utils/GeneratorNumber.js";
import Car from "./Car.js";

class RacingGame {
  static PLAY_TRY = 5;

  // 수정 사항 : 코드 간결하게 변경
  static createRacingCars(name) {
    return name.split(",").map((name) => new Car(name.trim()));
  }

  static racing(cars) {
    console.log("\n");
    console.log("실행 결과");

    for (let i = 0; i < PLAY_TRY; i++) {
      for (let j = 0; j < cars.length; j++) {
        let randomValue = generateRandomNumber();
        cars[j].move(randomValue);
      }
      for (let i = 0; i < cars.length; i++) {
        console.log(cars[i].name + " : " + "-".repeat(cars[i].position));
      }
      console.log("\n");
    }

    return cars;
  }

  static getWinners(cars = []) {
    let maxPosition = Math.max(...cars.map((car) => car.position));
    let maxPositionCars = cars.filter((car) => car.position === maxPosition);

    return maxPositionCars; // car 객체
  }
}

export default RacingGame;
