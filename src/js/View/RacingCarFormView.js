import { NAME, GAME_STATE } from '../constants';
import View from './View';
export default class RacingCarFormView extends View {
  constructor(target, model) {
    super(target, model);
    this.model.subscribe(this.render.bind(this));
    this.render();
  }

  setInitialState() {
    this.carNames = '';
    this.tryCount = '';
  }

  setEvent() {
    this.addEvent('submit', 'form', async (e) => {
      e.preventDefault();
      const $carNameInput = e.target[NAME.CAR_NAME + '-input'];
      const $raceCountInput = e.target[NAME.RACING_COUNT + '-input'];

      if (this.model.isGameState([GAME_STATE.READY])) {
        this.tryCount = $raceCountInput.value;
        await this.model.play(+$raceCountInput.value);
        return;
      }
      const carNames = $carNameInput.value.split(',');
      this.carNames = $carNameInput.value;
      this.model.setCarNames(carNames);
    });
  }

  componentWillMount() {
    const isReset = this.model.isGameState([GAME_STATE.INITIAL]);
    if (isReset) {
      this.setInitialState();
    }
  }

  #getCarNameFieldsetTemplate({ disabled, value }) {
    return String.raw`<fieldset name="car-name-fieldset" ${
      disabled ? 'disabled' : ''
    }>
    <legend>
      5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
      예시) EAST, WEST, SOUTH, NORTH
    </legend>
    <div class="d-flex">
      <input name="car-name-input" type="text" class="w-100 mr-2" placeholder="자동차 이름" value="${value}"/>
      <button type="submit" class="btn btn-cyan">확인</button>
    </div>
  </fieldset>`;
  }

  #getRaceCountFieldsetTemplate({ isShow, disabled, value }) {
    return String.raw`<fieldset name="racing-count-fieldset" ${
      isShow ? '' : "hidden"
    } ${disabled ? 'disabled' : ''}>
    <legend>시도할 횟수를 입력해주세요.</legend>
    <div class="d-flex">
      <input name="racing-count-input" type="number" class="w-100 mr-2" placeholder="시도 횟수" value="${value}"/>
      <button type="submit" class="btn btn-cyan">확인</button>
    </div>
  </fieldset>`;
  }

  getTemplate() {
    const isCarNameDisabled = this.model.isGameState([
      GAME_STATE.READY,
      GAME_STATE.PLAYING,
      GAME_STATE.FINISHED,
    ]);
    const isRaceCountDisabled = this.model.isGameState([
      GAME_STATE.PLAYING,
      GAME_STATE.FINISHED,
    ]);

    return String.raw`<form>
    <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
   ${this.#getCarNameFieldsetTemplate({
     disabled: isCarNameDisabled,
     value: this.carNames,
   })}
 ${this.#getRaceCountFieldsetTemplate({
   disabled: isRaceCountDisabled,
   isShow: isCarNameDisabled,
   value: this.tryCount,
 })}
  </form>`;
  }
}
