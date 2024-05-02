// 레이싱 할때 필요한것은???
// 차들,

import { EXECUTE_RACING_MAX_COUNT } from "../constants/number.js";
import { randomNumber } from "../util/random.js";
import Car from "./Car.js";

// numberOfRace = 레이싱 몇판 할겨?
export class Racing {
  cars = [];
  currRound;
  maxRound;

  constructor(enter) {
    this.cars = enter.map((name) => new Car(name));
    this.currRound = 0;
    this.maxRound = EXECUTE_RACING_MAX_COUNT;
  }

  //레이싱 게임을 시작하면
  // 1판당 , 참여한 cars의 위치값을 확인한다.
  //  5번째 게임 라운드 후,
  // 이긴 사람을 조회한다.

  gameRound() {
    // 무작위값이 4이상일 때 자동차는 전진
    // 경주는 5회로 고정
    this.cars.forEach((car) => car.drive(randomNumber(0, 9)));
    this.currRound++;
  }

  //이긴사람 조회
  winner() {
    const maxPosition = Math.max(...this.cars.map((car) => car.position));
    return this.cars.filter((car) => car.position === maxPosition);
  }
}
