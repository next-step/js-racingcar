import { readLineAsync } from "./utils/readLineAsync.js";
import { parserName } from "./utils/Parser.js";

import {
  createRacingCars,
  getWinners,
  racing,
} from "../src/domain/RacingGame.js";

async function play() {
  // 자동차 이름 입력
  const name = await readLineAsync(
    "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분)\n"
  );

  // 자동차 리스트 생성
  let cars = createRacingCars(name);

  // 자동차 경주 시작
  let finishCars = racing(cars);

  // 우승자 추출
  let winners = getWinners(finishCars);

  // 우승자 이름 출력
  let winnersName = parserName(winners.map((i) => i.name));
  console.log(winnersName + "가 최종 우승했습니다.");
}

play();
