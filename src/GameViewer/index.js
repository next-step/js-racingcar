class GameViewer {
  #messageViewer;

  constructor(messageViewer) {
    this.#messageViewer = messageViewer;
  }

  printCarStatus({ name, distanceDriven }) {
    this.#messageViewer(`${name} : ${'-'.repeat(distanceDriven)}`);
  }

  printRecords(records) {
    this.#messageViewer('\n실행 결과\n');

    records.forEach((carsRecord) => {
      carsRecord.forEach((record) => this.printCarStatus(record));
      this.#messageViewer('\n');
    });
  }

  printWinningCars(winningCars) {
    const winningCarNames = winningCars.map((car) => car.name).join(',');

    this.#messageViewer(`${winningCarNames}가 최종 우승했습니다.`);
  }

  printErrorMessage(errorMessage) {
    this.#messageViewer(`\n${errorMessage}\n`);
  }

  printRestart() {
    this.#messageViewer('\n게임을 다시 시작하겠습니다.\n');
  }
}

export default GameViewer;
