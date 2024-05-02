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
    await printMessage(this.#env, "\n실행 결과");
    this.#currentLab = 0;
    const cars = this.#input.cars;
    for (let i = 0; i < this.#lab; i++) {
      await this.moveCars(cars);
      await printMessage(this.#env, this.#input.raceOutput);
      this.#currentLab += 1;
    }
    await printMessage(this.#env, this.#input.winner);
  }

  async moveCars(cars) {
    for (const car of cars) {
      const number = await getRandomNum();
      car.conditionsMove(number);
    };
  }

  get currentLab() {
    return this.#currentLab;
  }
}

const printMessage = async(env, msg) => {
  if(!env) {
    console.log(msg);  
  }
}

export default Race;