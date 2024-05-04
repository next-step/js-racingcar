import Car from './Car.js';
import { printCarPosition } from '../utils/print.js';

export default class Race {
  // 라운드 횟수
  static ROUNDS = 5;

  // 참가 자동차 목록
  #cars = [];

  constructor(cars) {
    this.#cars = cars;
  }

  // 다형성을 지원하는 Named Constructor
  static createWithInput(input) {
    const carNames = Race.parseInput(input);
    const cars = carNames.map(name => new Car(name));

    return new Race(cars);
  }

  static parseInput(input) {
    const regex = /^[0-9A-Za-z]+(?:,[0-9A-Za-z]+)*$/;
    if (!regex.test(input)) {
      throw new Error('자동차 이름은 쉼표(,)를 기준으로만 구분할 수 있습니다.');
    }
    return input.split(',');
  }

  // 라운드 시작
  initRound() {
    this.#cars.forEach(car => {
      // 전진 시도
      const randomValue = Math.floor(Math.random() * 10);
      car.move(randomValue);

      // 위치 출력
      printCarPosition(car);
    });
  }

  // 경주 시작: 5라운드로 진행
  initRace() {
    // 라운드별 진행
    for (let i = 0; i < Race.ROUNDS; i++) {
      console.log(`\nRound ${i + 1})`);
      this.initRound();
    }
  }

  // 우승자 목록
  get winners() {
    const maxPosition = Math.max(...this.#cars.map(car => car.position));
    return this.#cars.filter(car => car.position === maxPosition);
  }
}
