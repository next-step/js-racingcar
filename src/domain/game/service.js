import { getRandomNumber } from '../../utils/index.js';
import {
  renderCarMovementInfo,
  renderCurrentLapEnd,
  renderGameEnd,
  renderGameResult,
} from '../../view/game/index.js';
import Car from '../car/service.js';

export default class Game {
  static DEFAULT_LAP = 5;
  static MIN_MOVEMENT_THRESHOLD = 4;

  #players = [];
  #lap = 0;

  constructor({ names, lap = Game.DEFAULT_LAP }) {
    this.#players = names;
    this.#lap = lap;
  }

  /**
   * 자동차 이름들을 가져오는 함수
   *
   * @returns 자동차 이름들
   */
  getPlayers() {
    return this.#players;
  }

  /**
   * 자동차 경주의 총 횟(바퀴) 수를 가져오는 함수
   *
   * @returns 경주의 총 횟 수
   */
  getLap() {
    return this.#lap;
  }

  /**
   * 우승한 자동차 이름들을 추출하는 함수
   *
   * @param {Car[]} cars 마지막 바퀴까지 달린 자동차들
   * @returns 우승한 자동차 이름들
   */
  getWinnersName(cars) {
    const carLocations = cars.map((car) => car.getLocation());
    const topTrack = Math.max(...carLocations);

    return cars
      .filter((car) => topTrack === car.getLocation())
      .map((car) => car.getName())
      .join(', ');
  }

  /**
   * 움직임이 필요할 때, 실행되는 Callback 함수
   *
   * @param {Car} car 자동차 정보
   * @returns 자동차 이름과 자동차의 위치 정보
   */
  handleCarMove(car) {
    car.moveForward();

    return { name: car.getName(), location: car.getLocation() };
  }

  /**
   * 움직임이 필요가 없을 때, 실행되는 Callback 함수
   *
   * @param {Car} car 자동차 정보
   * @returns 자동차 이름과 자동차의 위치 정보
   */
  handleCarStay(car) {
    return { name: car.getName(), location: car.getLocation() };
  }

  /**
   * 자동차의 움직임 여부을 결정하는 함수
   *
   * @param {Object} 자동차 정보 및 임계치
   * @param {function(Object): void} onMove 움직일 필요가 있어 작동되는 callback
   * @param {function(Object): void} onStay 움직일 필요가 없어 작동되는 callback
   * @returns 자동차 이름과 자동차의 위치 정보
   */
  determineCarMovement(
    { car, threshold = Game.MIN_MOVEMENT_THRESHOLD },
    onMove,
    onStay,
  ) {
    if (threshold < Game.MIN_MOVEMENT_THRESHOLD) {
      return onStay(car);
    }

    return onMove(car);
  }

  /**
   * 게임 시작
   */
  start() {
    const cars = this.#players.map((name) => new Car({ name }));

    renderGameResult();

    for (let lap = 0; lap < this.#lap; lap++) {
      cars.forEach((car) => {
        const threshold = getRandomNumber();
        const { name, location } = this.determineCarMovement(
          { car, threshold },
          this.handleCarMove,
          this.handleCarStay,
        );

        renderCarMovementInfo(name, location);
      });
      renderCurrentLapEnd();
    }

    const winners = this.getWinnersName(cars);
    renderGameEnd(winners);
  }
}
