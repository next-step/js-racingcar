import { printCarPosition, printRaceWinners } from '../utils/print.js';

export default class Race {
  // 라운드 횟수
  static ROUNDS = 5;

  // 참가 자동차 목록
  #cars = [];

  constructor(cars) {
    this.#cars = cars;
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
    console.log('🏁 자동차 경주를 시작합니다!');

    // 라운드별 진행
    for (let i = 0; i < Race.ROUNDS; i++) {
      console.log(`\nRound ${i + 1})`);
      this.initRound();
    }

    // 우승자 명단 출력
    console.log('\n🎉 우승자는?');
    printRaceWinners(this);
  }
  // 우승자 목록
  get winners() {
    const maxPosition = Math.max(...this.#cars.map(car => car.position));
    return this.#cars.filter(car => car.position === maxPosition);
  }
}
