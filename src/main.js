import { readLineAsync } from "./utils.js";
import Racing from "./Racing.js";

async function play() {
  const carNames = await readLineAsync("자동차 이름을 입력하세요\n");
  try {
    const racing = new Racing(carNames);
    console.log(`\n실행 결과`);
    racing.start();
    console.log(`경주를 완료했습니다.`);
  } catch (error) {
    throw error;
  }
}

play();
