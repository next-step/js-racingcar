import { readLineAsync } from "./utils.js";
import Racing from "./Racing.js";

async function play() {
  const carNames = await readLineAsync(
    "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n"
  );
  try {
    const racing = new Racing(carNames);
    console.log(`\n실행 결과`);
    racing.start();
    console.log(`${racing.getWinners().join(", ")}가 최종 우승했습니다.`);
  } catch (error) {
    throw error;
  }
}

play();
