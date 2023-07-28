const DIVIDER = "\n";

export default class View {
  #display(...rest) {
    return console.log(...rest);
  }

  displayDivider() {
    this.#display(DIVIDER);
  }

  displayInitMessage() {
    const INIT_MESSAGE =
      "경주할 자동차 이름을 입력하세요(이름은 쉼표(,) 기준으로 구분).";

    this.#display(INIT_MESSAGE);
  }

  displayGuideMessage() {
    const GUIDE_MESSAGE = "실행 결과";

    this.#display(GUIDE_MESSAGE);
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
    const POSTFIX = "가 최종 우승했습니다.";

    winners.forEach((winner) => {
      result += winner.name + " ";
    });

    this.#display(result + POSTFIX);
    this.displayDivider();
  }
}
