import { createDom } from './util.js'

export const TEMPLATE = {
  INPUT_NAME_COUNT: `
            <section class="d-flex justify-center mt-5">
                <form id="game-input-panel-component">
                  <fieldset class="car-player-name">
                    <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
                    <p>
                      5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
                      예시) EAST, WEST, SOUTH, NORTH
                    </p>
                    <div class="d-flex add-car-players">
                      <input type="text" class="w-100 mr-2" placeholder="자동차 이름" />
                      <button type="button" class="btn btn-cyan car-player-btn">확인</button>
                    </div>
                  </fieldset>
                  <fieldset class="car-racing-count hidden" >
                  <p>시도할 횟수를 입력해주세요.</p>
                  <div class="d-flex input-racing-count">
                    <input type="number" class="w-100 mr-2" placeholder="시도 횟수" />
                    <button type="button" class="btn btn-cyan play-count-btn ">확인</button>
                  </div>
                </fieldset>
                </form>
              </section>
              <div id="game-process-component" class="d-flex justify-center mt-5"></div>
              <div id="game-result-component" class="d-flex justify-center mt-5"></div>

`,

  CAR_BOARD_ELEMENT: () => {
    return  createDom('div', "d-flex", "justify-center","mt-5", "hello");
  },
  CAR_ELEMENT: (name) => {
    const car = createDom('div', 'mr-2')
    car.innerHTML = TEMPLATE.CAR_STATUS(name)
    return car
  },
  CAR_STATUS: (name) => `
                            <div class="car-player">${name}</div>
                            <div class="d-flex justify-center mt-3 spinner-component">
                              <div class="relative spinner-container">
                                <span class="material spinner"></span>
                              </div>
                            </div>
                         
                        `,
  CAR_MOVE: `<div class="forward-icon mt-2">⬇️️</div>`,
  WINNER: (carList) => {
    const maxNum = carList.reduce((max, {count}) => (max < count ? max = count : max) ,0);
    const winners = carList.filter(player => player.count === maxNum).map(player => player.name).join(',')
    return `<section class="d-flex justify-center mt-5">
              <div>
                <h2>🏆 최종 우승자: ${winners}🏆</h2>
                 <div class="d-flex justify-center">
                    <button type="button" class="btn btn-cyan restart-racing">다시 시작하기</button>
                 </div>
              </div>
             </section>`
  }
}

export const MESSAGE = {
  NO_VALID_CAR_NAMES: '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다',
  NO_VALID_COUNT: '입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 1이상이어야 합니다.',
  WINNER_ALERT: '🎇🎇🎇🎇축하합니다!🎇🎇🎇🎇'
}

export const DELAY_TIME = {
  WINNER_TIME: 2000
}

export const MOVE_POSSIBLE_NUMBER = 3
export const NAME_LIMIT_LENGTH = 6
export const NAME_MINIMUM_LENGTH = 0
export const MINIMUM_COUNT = 0


