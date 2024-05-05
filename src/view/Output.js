const Output = {
  printCarRaceWinners(winnerNames) {
    console.log(`${winnerNames}가 최종 우승했습니다.`);
  },

  printCarStatus(carName, carPosition) {
    console.log(`${carName} : ${carPosition}`);
  },

  printCarRaceRoundResult(cars, roundResult) {
    cars.forEach((car, carIndex) => {
      const carPosition = "-".repeat(roundResult.at(carIndex));
      this.printCarStatus(car.name, carPosition);
    });
    console.log();
  },

  printCarRaceRoundsResult(carRace) {
    const cars = carRace.competitors;

    console.log("\n실행 결과");
    carRace.roundResults.forEach((roundResult) => {
      this.printCarRaceRoundResult(cars, roundResult);
    });
  },
};

export default Output;
