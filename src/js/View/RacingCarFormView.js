import { NAME } from '../constants';
import View from './View';

export default class RacingCarFormView extends View {
  setEvent() {
    document.addEventListener('reset', () => {
      this.render();
    });
    this.addEvent('submit', 'form', async (e) => {
      e.preventDefault();
      const $carNameInput = e.target[NAME.CAR_NAME + '-input'];
      const $carNameFieldset = e.target[NAME.CAR_NAME + '-fieldset'];
      const $raceCountInput = e.target[NAME.RACING_COUNT + '-input'];
      const $raceCountFieldset = e.target[NAME.RACING_COUNT + '-fieldset'];

      if ($carNameFieldset.disabled) {
        await this.model.play(+$raceCountInput.value);
        $raceCountFieldset.disabled = true;
        return;
      }
      const carNames = $carNameInput.value.split(',');
      this.model.setCarNames(carNames);
      $carNameFieldset.disabled = true;
      $raceCountFieldset.classList.remove('hidden');
    });
  }

  getTemplate() {
    return String.raw` <form>
    <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
    <fieldset name="car-name-fieldset">
      <legend>
        5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
        예시) EAST, WEST, SOUTH, NORTH
      </legend>
      <div class="d-flex">
        <input name="car-name-input" type="text" class="w-100 mr-2" placeholder="자동차 이름" />
        <button type="submit" class="btn btn-cyan">확인</button>
      </div>
    </fieldset>
    <fieldset name="racing-count-fieldset" class="hidden">
      <legend>시도할 횟수를 입력해주세요.</legend>
      <div class="d-flex">
        <input name="racing-count-input" type="number" class="w-100 mr-2" placeholder="시도 횟수" />
        <button type="submit" class="btn btn-cyan">확인</button>
      </div>
    </fieldset>
  </form>`;
  }
}
