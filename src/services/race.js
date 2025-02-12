import { MAX_LENGTH, ROUNDS } from "../constants/index.js";
import Car from "../models/car.js";

export default function Race(names) {
  // 쉼표를 기준으로 자동차 이름 구분
  const namesArray = names.split(",").map((name) => name.trim());

  // 유효성 검사
  namesArray.forEach((name) => {
    if (name.length > MAX_LENGTH) {
      console.error("이름은 5자 이하만 가능합니다.");
      process.exit(1);
    }
  });

  // 실행
  namesArray.forEach((name) => {
    console.log("경주할 자동차 이름을 입력하세요.");
    console.log(name);
    console.log("");
    const car = new Car(name);

    console.log("실행 결과");
    for (let i = 0; i < ROUNDS; i++) {
      car.move();
      console.log(car.getStatus());
      console.log("");
    }
    console.log("경주를 완료했습니다.");
  });
}
