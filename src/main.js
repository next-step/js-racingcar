import { MAX_LENGTH } from "./constants/index.js";
import Race from "./services/race.js";

export default function RaceGame(input) {
  // 쉼표를 기준으로 자동차 이름 구분
  const names = input.split(",").map((name) => name.trim());

  // 유효성 검사
  names.forEach((name) => {
    if (name.length > MAX_LENGTH) {
      console.error("이름은 5자 이하만 가능합니다.");
      process.exit(1);
    }
  });

  // 실행
  names.forEach((name) => {
    new Race(name).start();
  });
}

const input = "boky1, boky2";
RaceGame(input);
