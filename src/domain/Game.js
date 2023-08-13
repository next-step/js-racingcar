const Car = require('./Car.js')
const Race = require('./Race.js')
const utils = require('../utils/utils.js')
const winnerView = require('../view/RacingGameView.js')

const Game = {
  cars: [],
  race: Race,
  getNumb: utils.randomNumber,

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
    count = utils.validateCount(count);
    this.race.setCount(count);
  },

  // 자동차 게임을 시작하기
  gameStart() {
    // 자동차 게임의 총 횟수 만큼 반복하기
    for (let raceCount = 0; raceCount < this.race.totalCount; raceCount++) {
      // 자동차 갯수만큼 반복하기
      this.cars.forEach(car => {
        // 랜덤 숫자 조건에 따른 자동차 전진
        if ( 4 <= this.getNumb()) {
          car.go();
        }
      })
    }
  },

  // 우승자를 축하하기
  congratulateWinner() {
    winnerView(this.cars);
  }
}
module.exports = Game;
