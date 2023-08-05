const Car = require('./Car.js')
const Race = require('./Race.js')
const utils = require('../utils/utils.js')
const Message = require('../constants/message.js')

const Game = {
  cars: [],
  race: Race,

  // 경주할 자동차를 등록하기
  register(carNames) {
    this.cars = carNames.split(',').map((name) => {
      // 유효성 검사
      name = name.trim();
      utils.validateName(name);
      return ({ ...Car, name })
    }
    );
  },

  // 자동차 게임의 총 횟수 설정하기
  declareCount(count) {
    if (isNaN(count)) {
      count = Message.RACE_COUNT
    }
    this.race.setCount(count);
  },

  // 자동차 게임을 시작하기
  gameStart() {
    // 자동차 게임의 총 횟수 만큼 반복하기
    for (let raceCount = 0; raceCount <= this.race.totalCount; raceCount++) {
      // 자동차 갯수만큼 반복하기
      this.cars.forEach(car => {
        // 랜덤 숫자 조건에 따른 자동차 전진
        if (utils.randomNumber()) {
          car.go();
        }
      })
    }
  },

  // 우승자를 축하하기
  congratulateWinner() {
    const maxPosition = Math.max(...this.cars.map(({ position }) => position));
    // 우승자 선정하기
    const winners = this.cars.filter(({ position }) => position === maxPosition).map(({ name }) => name);
    console.log(Message.WINNER(winners, maxPosition));
  }
}
module.exports = Game;
