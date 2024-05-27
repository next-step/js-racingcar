const CAR_POSITION_MARKER = "-";

class OutputView {
  printCarPosition(car) {
    console.log(`${car.name}: ${CAR_POSITION_MARKER.repeat(car.position)}`);
  }

  printCarsPosition(cars) {
    cars.forEach((car) => this.printCarPosition(car));
  }

  printWinners(winnerCars) {
    const winnerNames = winnerCars.map((car) => car.name).join(", ");
    console.log(`${winnerNames}가 최종 우승했습니다.`);
  }
}

export default OutputView;
