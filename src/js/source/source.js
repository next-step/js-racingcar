const $ = (selector) => document.querySelector(selector)
const $All = (selector) => document.querySelectorAll(selector)

const [carButtonDom,tryButtonDom] = $All(".btn-cyan")
const [carNameDom, tryNumberDom] = $All('.w-100');
const progressTitle = $('.mt-4');
const resultDom = $All('.mt-5')[2];

const setting = (carName)=>` <div class="mr-2">
            <div class="car-player">${carName}</div>
            <div class="d-flex justify-center mt-3">
              <div class="relative spinner-container">
                <span class="material spinner"></span>
              </div>
            </div>
          </div>`

const moving = ()=>`<div class="forward-icon mt-2">⬇️️</div>`

const result = (winnerName) =>`
          <div>
          <h2>🏆 최종 우승자: <span id="winners">${winnerName}</span> 🏆</h2>
          <div class="d-flex justify-center">
            <button type="button" class="btn btn-cyan">다시 시작하기</button>
          </div>
          </div>
`

export {$,$All,carButtonDom,tryButtonDom,carNameDom,tryNumberDom,progressTitle,resultDom,setting,moving,result}
