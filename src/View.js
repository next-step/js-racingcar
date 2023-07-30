const MESSAGES = Object.freeze({
  INIT_GUIDE: "경주할 자동차 이름을 입력하세요(이름은 쉼표(,) 기준으로 구분).",
  RESULT_GUIDE: "실행 결과",
  WINNER_POSTFIX: "가 최종 우승했습니다.",
});

export default class View {
  #log(...rest) {
    return console.log(...rest);
  }

  #logDivider() {
    const DIVIDER_SYM = "";
    this.#log(DIVIDER_SYM);
  }

  #logCarStatus(car) {
    const DISTANCE_SYM = "-";
    const SPLIT_SYM = " : ";

    this.#log(`${car.name}${SPLIT_SYM}${DISTANCE_SYM.repeat(car.position)}`);
  }

  logResultGuideMessage() {
    this.#log(MESSAGES.RESULT_GUIDE);
  }

  logRoundStatus(game) {
    game.cars.forEach((car) => {
      this.#logCarStatus(car);
    });

    this.#logDivider();
  }

  logWinners(winners) {
    const SEPARATOR_SYM = ", ";
    const WINNER_NAMES = winners.map((winner) => winner.name);

    this.#log(WINNER_NAMES.join(SEPARATOR_SYM) + MESSAGES.WINNER_POSTFIX);
  }
}
