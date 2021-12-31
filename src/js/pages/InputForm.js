import Component from "../lib/Component.js";
import {$} from "../components/utils.js";
import {ErrorMessage} from "../constants.js";

export default class InputForm extends Component {
  setup() {
    this.submitHandler = this.submitHandler.bind(this);
  }
  submitHandler() {
    const {changeStep} = this.props;
    const inputCarNames = $('#carNames').value.split(',').map(name => name.trim());
    const inputTryAmount = $('#tryAmount').value;

    if(inputCarNames.length < 1) {
      alert(ErrorMessage.NO_INPUTS);
      return;
    } else if(inputCarNames.length > 10) {
      alert(ErrorMessage.OUT_OF_BOUNDS_NAMES_SIZE);
      return;
    } else if(inputCarNames.filter(carName => carName.length>5).length > 0) {
      alert(ErrorMessage.OUT_OF_LENGTH_NAME);
      return;
    } else if(inputCarNames.filter(carName => !Boolean(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\ |]+$/.test(carName))).length > 0) {
      alert(ErrorMessage.NOT_ALLOWED_TYPE);
      return;
    } else if(inputTryAmount < 1) {
      alert(ErrorMessage.LESS_THAN_MINIMUM_INPUT_AMOUNT);
      return;
    } else if(inputTryAmount > 10) {
      alert(ErrorMessage.MORE_THAN_MAXIMUM_INPUT_AMOUNT);
      return;
    }

    changeStep({
      step: 2,
      cars: inputCarNames.map(name => this.Car(name)),
      tryAmount: inputTryAmount
    });
  }

  Car(name) {
    return {
      name: name,
      forward: 0,
      records: []
    }
  }

  template() {
    const {cars, tryAmount} = this.props;
    const carNames = Array.isArray(cars) && cars.length > 0 ? cars.map(car => car.name) : [];

    return `
      <form id="inputForm">
        <fieldset>
          <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
          <p>
            5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
            예시) EAST, WEST, SOUTH, NORTH
          </p>
          <div class="d-flex">
            <input id="carNames" type="text" class="w-100 mr-2" placeholder="자동차 이름" value="${carNames.join(',')}">
<!--            <button id="carNamesSubmit" type="submit" class="btn btn-cyan">확인</button>-->
          </div>
        </fieldset>
        <fieldset>
          <p>시도할 횟수를 입력해주세요.</p>
          <div class="d-flex">
            <input id="tryAmount" type="number" class="w-100 mr-2" placeholder="시도 횟수" value="${tryAmount}"/>
            <button id="startRacing" type="submit" class="btn btn-cyan">확인</button>
          </div>
        </fieldset>
      </form>
    `;
  }

  mounted() {
    $('#inputForm').addEventListener('submit', this.submitHandler);
  }

}