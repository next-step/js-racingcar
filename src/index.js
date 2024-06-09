import { getInputCars, getMaxRound, startRacing } from "./views/racingView.js";

// 입출력 예시
async function play() {
  const cars = await getInputCars();
  const roundCount = await getMaxRound();

  startRacing(cars, roundCount);
}

play();
