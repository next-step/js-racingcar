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

  printWinners(winnerNames) {
    const winner = winnerNames.join(", ");
    console.log(`${winner}가 최종 우승했습니다.`);
  }

  printCarLocation(name, location) {
    console.log(`${name} : ${"-".repeat(location)}`);
  }

  printErrorMessage(error) {
    console.log(error.message);
  }
}

export default Output;
