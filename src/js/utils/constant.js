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
  CAR_BOARD: (component) => `<section class="d-flex justify-center mt-5">
                        <div class="mt-4 d-flex">
                          ${component}
                        </div>
                     </section>
                    `,
  CAR_STATUS: (name) => `<div class="mr-2"  data-name=${name}>
                            <div class="car-player">${name}</div>
                            <div class="d-flex justify-center mt-3 spinner-component">
                              <div class="relative spinner-container">
                                <span class="material spinner"></span>
                              </div>
                            </div>
                         </div>
                        `,
  CAR_MOVE: `<div class="forward-icon mt-2">⬇️️</div>`,
  WINNER: (names) => {

    const winners = names.join(',')
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
