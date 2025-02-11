class Output {
  printRaceResult(result) {
    console.log("\n실행결과");

    const roundWithCars = result.map((round) => round.cars);

    roundWithCars.forEach((round) => {
      round.forEach((car) => this.printCarLocation(car.name, car.location));

      // 라운드 구분
      console.log("");
    });
  }

  printCarLocation(name, location) {
    console.log(`${name} : ${"-".repeat(location)}`);
  }
}

export default Output;
