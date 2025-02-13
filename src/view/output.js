export const printRacingGameResult = (raceResults, winners) => {
  console.log("\n실행 결과");

  for (const roundResult of raceResults) {
    printCarPositions(roundResult);
  }

  console.log(`${winners.join(", ")}가 최종 우승했습니다.`);
};

const printCarPositions = (cars) => {
  for (const { name, position } of cars) {
    console.log(`${name} : ${"-".repeat(position)}`);
  }
  console.log("");
};
