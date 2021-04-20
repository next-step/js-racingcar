const $ = (selector) => document.querySelector(selector);
const $All = (selector) => document.querySelectorAll(selector);

const [carButtonDom, tryButtonDom] = $All(".btn-cyan");
const [carNameDom, tryNumberDom] = $All(".w-100");
const progressTitle = $(".mt-4");
const resultDom = $All(".mt-5")[2];
const sectionRaceTimes = $("#section-race-times");

const setting = (carName) => ` <div class="mr-2">
            <div class="car-player">${carName}</div>
            <div class="d-flex justify-center mt-3">
              <div class="relative spinner-container">
                <span class="material spinner"></span>
              </div>
            </div>
          </div>`;

const moving = () => `<div class="forward-icon mt-2">⬇️️</div>`;

const Message = {
  success: "🎇🎇🎇🎇축하합니다!🎇🎇🎇🎇",
  overFiveError:
    "유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다",
  countError:
    "입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 1이상이어야 합니다.",
};

const result = (winnerName) => `
          <div>
          <h2>🏆 최종 우승자: <span id="winners">${winnerName}</span> 🏆</h2>
          <div class="d-flex justify-center">
            <button type="button" class="btn btn-cyan" id="restart">다시 시작하기</button>
          </div>
          </div>
`;

export {
  $,
  $All,
  carButtonDom,
  tryButtonDom,
  carNameDom,
  tryNumberDom,
  progressTitle,
  resultDom,
  setting,
  moving,
  result,
  sectionRaceTimes,
  Message,
};
