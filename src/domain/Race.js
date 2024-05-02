import {getRandomNum} from '../common';
class Race {
  #input;
  #currentLab = 0;
  #env = true;
  #lab;

  constructor(input, lab = 5, env = true) {
    if(typeof lab !== 'number' || lab === 0) {
      throw new Error('랩은 숫자이거나 0보다 커야 합니다.');
    }
    this.#input = input;
    this.#lab = lab;
    this.#env = env;
  }

  async start() {
    await printStartMessage(this.#env);
    this.#currentLab = 0;
    const cars = this.#input.cars;
    for (let i = 0; i < this.#lab; i++) {
      await this.moveCars(cars);
      this.#currentLab += 1;
    }
  }

  async moveCars(cars) {
    for (const car of cars) {
      const number = await getRandomNum();
      car.conditionsMove(number);
    };
  }

  winner() {
    const winner = this.#input.winner;
    console.log(winner);
  }

  get currentLab() {
    return this.#currentLab;
  }
}

const printStartMessage = (env) => {
  if(!env) {
    console.log("\n실행 결과");
  }
}

export default Race;