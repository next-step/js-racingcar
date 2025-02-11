class OutputView {
  getCarStatus({ name, position }) {
    return `${name} : ${"-".repeat(position)}`;
  }

  printRaceResult(raceResult) {
    console.log("\n실행 결과");

    raceResult.raceHistory.forEach((roundData) => {
      this.printRoundStatus(roundData);
      console.log("");
    });
    this.printWinners(raceResult.findWinners());
  }

  printRoundStatus({ cars }) {
    cars.forEach((car) => console.log(this.getCarStatus(car)));
  }

  printWinners(winners) {
    const winnerNames = winners.join(", ");
    console.log(`${winnerNames}가 최종 우승했습니다.`);
  }

  printError(errorMessage) {
    console.log(errorMessage);
  }
}

export default OutputView;
