import { joinCarNamesByComma } from "./car.js";

export const printCarRaceWinners = (carRace) => {
  const carRaceWinners = carRace.winners;
  const joinedCarRaceWinners = joinCarNamesByComma(carRaceWinners);

  console.log(`${joinedCarRaceWinners}가 최종 우승했습니다.`);
};
