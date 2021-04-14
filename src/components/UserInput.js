import {
  INVALID_CAR_NAME_LENGTH_MESSAGE,
  TOO_FEW_RACE_TIMES_MESSAGE,
} from '../library/constants/alertMessage.js';
import { CAR_NAME, MIN_RACE_TIMES } from '../library/constants/validation.js';
import Component from '../library/core/Component.js';
import Car from '../library/models/Car.js';
import { $, disableDOMElements } from '../library/utils/dom.js';

export default class UserInput extends Component {
  mountTemplate() {
    this.$target.innerHTML = `
      <section>
        <p>
          5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
          예시) EAST, WEST, SOUTH, NORTH
        </p>
      </section>
      <section>
        <div class="d-flex">
          <input type="text" id="input-car-name" class="w-100 mr-2" placeholder="자동차 이름" />
          <button type="submit" id="submit-car-name" class="btn btn-cyan">확인</button>
        </div>
      </section>
      <section id="section-race-times" class="mt-5 hidden" >
        <p>시도할 횟수를 입력해주세요.</p>
        <div class="d-flex">
          <input type="number" id="input-race-times" class="w-100 mr-2" placeholder="시도 횟수" />
          <button type="submit" id="submit-race-times" class="btn btn-cyan">확인</button>
        </div>
      </section>
    `;
  }

  initEvent() {
    this.$target.addEventListener('click', ({ target }) => {
      if (target.id === 'submit-car-name') {
        this.#handleSubmitCarName();
      }
      if (target.id === 'submit-race-times') {
        this.#handleSubmitRaceTimes();
      }
    });

    this.$target.addEventListener('keyup', ({ key, target }) => {
      if (key !== 'Enter') return;

      if (target.id === 'input-car-name') {
        this.#handleSubmitCarName();
      }
      if (target.id === 'input-race-times') {
        this.#handleSubmitRaceTimes();
      }
    });
  }

  #handleSubmitCarName() {
    const $inputCarName = $('#input-car-name');
    const $buttonCarName = $('#submit-car-name');
    const carNames = $inputCarName.value.split(',').map(name => name.trim());
    if (!this.#isValidCarNames(carNames)) {
      alert(INVALID_CAR_NAME_LENGTH_MESSAGE);
      return;
    }
    this.props.cars.set(carNames.map(carName => new Car(carName)));
    disableDOMElements($buttonCarName, $inputCarName);
    this.showRaceTimesInput();
  }

  #isValidCarNames(carNames) {
    return carNames.every(
      ({ length }) =>
        length >= CAR_NAME.MIN_LENGTH && length <= CAR_NAME.MAX_LENGTH
    );
  }

  showRaceTimesInput() {
    $('#section-race-times').classList.remove('hidden');
    $('#input-race-times').focus();
  }

  #handleSubmitRaceTimes() {
    const $inputRaceTimes = $('#input-race-times');
    const $buttonRaceTimes = $('#submit-race-times');
    if (!this.#isValidRaceTimes($inputRaceTimes.value)) {
      alert(TOO_FEW_RACE_TIMES_MESSAGE);
      return;
    }
    this.props.raceTimes.set(parseInt($inputRaceTimes.value, 10));
    disableDOMElements($buttonRaceTimes, $inputRaceTimes);
    this.props.mountGameProcess();
    this.props.race();
  }

  #isValidRaceTimes(raceTimes) {
    return raceTimes > MIN_RACE_TIMES;
  }
}
