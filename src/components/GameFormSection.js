import Component from '../core/Component.js';
import {
  $,
  eventHandler,
  handleElement,
  getRandomNumber,
} from '../utils/utils.js';
import { MESSAGE, GAME } from '../utils/constants.js';
import Car from '../core/Car.js';
const { enableElement, disableElement, showElement, hiddenElement } =
  handleElement;

export default class GameFormSection extends Component {
  mount() {
    this.$target.innerHTML = `
      <form id="race-form">
        <fieldset>
          <p>
            5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
            예시) EAST, WEST, SOUTH, NORTH
          </p>
          <div class="d-flex">
            <input id="car-name-input" name="cars" type="text" class="w-100 mr-2" placeholder="자동차 이름" />
            <button id="car-name-btn" type="submit" class="btn btn-cyan">확인</button>
          </div>
        </fieldset>
        <fieldset id="try-count-section" hidden>
          <p>시도할 횟수를 입력해주세요.</p>
          <div class="d-flex">
            <input id="try-count-input" name="count" type="number" class="w-100 mr-2" placeholder="시도 횟수" />
            <button id="try-count-btn" type="submit" class="btn btn-cyan">확인</button>
          </div>
        </fieldset>
      </form>
    `;
  }

  checkCarLength(carNames) {
    return carNames.split(',').every((car) => car.trim().length <= 5);
  }

  onClickCarNameBtn() {
    const inputCarNames = new FormData($('#race-form')).get('cars');
    if (!this.checkCarLength(inputCarNames)) {
      alert(MESSAGE.NAME_ALERT);
      return;
    }
    this.props.cars.setNewState = inputCarNames
      .split(',')
      .map((car) => new Car(car.trim()));
    [$('#car-name-input'), $('#car-name-btn')].forEach((el) =>
      disableElement(el),
    );
    showElement($('#try-count-section'));
  }

  onClickRacingCount() {
    const raceCount = new FormData($('#race-form')).get('count');
    this.props.raceCount.setNewState = raceCount;
    [$('#try-count-input'), $('#try-count-btn')].forEach((el) =>
      disableElement(el),
    );
    this.props.gameSection();
    this.props.race();
  }

  bindEvents() {
    $('#race-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const {
        submitter: { id },
      } = e;
      if (id === 'car-name-btn') {
        this.onClickCarNameBtn();
      }

      if (id === 'try-count-btn') {
        this.onClickRacingCount();
      }
    });
  }
}
