const Output = {
  printCarRaceWinners(winnerNames) {
    console.log(`${winnerNames}가 최종 우승했습니다.`);
  },

  printCarStatus(carName, carPosition) {
    console.log(`${carName} : ${carPosition}`);
  },

  printCarRaceResult(cars) {
    cars.forEach((car) => {
      const carPosition = "-".repeat(car.position);
      this.printCarStatus(car.name, carPosition);
    });
    console.log();
  },
};

export default Output;
