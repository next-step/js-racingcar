import { joinCarNamesByComma } from "./car.js";

export const raceMultipleTimes = (carRace, times) => {
  while (times > 0) {
    carRace.race();
    times--;
  }
};

export const printCarRaceWinners = (carRace) => {
  const carRaceWinners = carRace.winners;
  const joinedCarRaceWinners = joinCarNamesByComma(carRaceWinners);

  console.log(`${joinedCarRaceWinners}가 최종 우승했습니다.`);
};
