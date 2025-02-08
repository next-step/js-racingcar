import Car from './Car.js';

const DEFAULT_LAP = 5;

export default class Game {
  #players = [];
  #lap = 0;

  constructor({ names, lap = DEFAULT_LAP }) {
    this.#players = names;
    this.#lap = lap;
  }

  /**
   * 현재 바퀴 수가 끝났다는 안내
   */
  #announceCurrentLapEnd() {
    console.log('');
  }

  /**
   * 게임의 결과를 안내
   */
  #announceGameResult() {
    console.log('');
    console.log('실행 결과');
  }

  /**
   * 게임이 끝났다는 걸 안내
   */
  #announceGameEnd() {
    console.log('경주 완료했습니다.');
  }

  /**
   * 해당 바퀴 떄, 자동차가 얼만큼 달리고 있는지 안내
   *
   * @param {string} name 자동차 이름
   * @param {number} location 자동차의 자동차 위치
   */
  #announcePlayerMovedTrack(name, location) {
    const movedTrack = this.drawMovedTrack(location);

    console.log(`${name} : ${movedTrack}`);
  }

  /**
   * 자동차 움직임 궤도를 그리는 함수
   *
   * @param {number} location 위치 값
   * @returns 움직인 궤도
   */
  drawMovedTrack(location) {
    return Array.from({ length: location }, () => '-').join('');
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
   * 자동차 경주 바퀴(Lap)마다 자동차의 움직임을 결정하고
   * 상태를 확인할 수 있는 함수
   *
   * @param {Car} car 자동차
   * @returns 자동차 이름과 움직인 자동차의 위치 정보
   */
  getPlayerCurrentStatus(car) {
    const name = car.getName();
    const movedLocation = car.moveForward();

    return { name, location: movedLocation };
  }

  /**
   * 게임 시작
   */
  start() {
    const cars = this.#players.map((name) => new Car({ name }));

    this.#announceGameResult();

    for (let lap = 0; lap < this.#lap; lap++) {
      cars.forEach((car) => {
        const { name, location } = this.getPlayerCurrentStatus(car);

        this.#announcePlayerMovedTrack(name, location);
      });
      this.#announceCurrentLapEnd();
    }
    this.#announceGameEnd();
  }
}
