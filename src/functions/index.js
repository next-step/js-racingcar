import Car from "../car/index.js";
import { MAX_LENGTH, ROUNDS } from "../constants/index.js";

export default function carGame(names) {
  // 쉼표를 기준으로 자동차 이름 구분
  const namesArray = names.split(",").map((name) => name.trim());

  namesArray.forEach((name) => {
    // 유효성 검사
    if (name.length > MAX_LENGTH)
      throw new Error("이름은 5자 이하만 가능합니다.");

    const car = new Car(name);

    for (let i = 0; i < ROUNDS; i++) {
      car.move();
      console.log(car.getStatus());
    }
  });
}
