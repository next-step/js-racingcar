const DIVIDER = "\n";
const MESSAGES = Object.freeze({
  INIT: "경주할 자동차 이름을 입력하세요(이름은 쉼표(,) 기준으로 구분).",
  RESULT: "실행 결과",
  WINNER_POSTFIX: "가 최종 우승했습니다.",
});

export default class View {
  #display(...rest) {
    return console.log(...rest);
  }

  displayDivider() {
    this.#display(DIVIDER);
  }

  displayInitMessage() {
    this.#display(MESSAGES.INIT);
  }

  displayGuideMessage() {
    this.#display(MESSAGES.RESULT);
  }

  displayCarStatus(car) {
    const DISTANCE_SYM = "-";
    const SPLIT_SYM = " : ";

    return `${car.name}${SPLIT_SYM}${DISTANCE_SYM.repeat(car.position)}`;
  }

  displayGameStatus(game) {
    let status = "";

    game.cars.forEach((car) => {
      status += this.displayCarStatus(car) + "\n";
    });

    this.#display(status);
    this.displayDivider();
  }

  displayGameResult(winners) {
    let result = "";

    winners.forEach((winner) => {
      result += winner.name + " ";
    });

    this.#display(result + MESSAGES.WINNER_POSTFIX);
    this.displayDivider();
  }
}
