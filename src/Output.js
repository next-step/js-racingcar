class Output {
  printRaceResult(result) {
    console.log("\n실행결과");

    // 라운드 마다 차 위치를 프린트한다.
    const roundWithCars = result.map((round) => round.cars);

    roundWithCars.forEach((round) => {
      round.forEach((car) => this.printRoundResult(car.name, car.location));
      // 라운드 구분
      console.log("");
    });
  }

  printCarStatus(name, location) {
    console.log(`${name} : ${"-".repeat(location)}`);
  }
}

export default Output;
