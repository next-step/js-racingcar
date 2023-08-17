class GameInput {
  #input;

  constructor(input) {
    this.#input = input;
  }

  getCarNamesByInput() {
    return this.#input(
      '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).'
    );
  }

  async getMaxRounsByInput() {
    return Number(await this.#input('시도할 회수는 몇회인가요?'));
  }
}

export default GameInput;
