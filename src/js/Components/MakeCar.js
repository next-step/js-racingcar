import { $ } from '../Utils/util.js';
import Component from '../Core/Component.js';

export default class MakeCar extends Component {
  carNames;

  template() {
    return `
        <form>
          <fieldset id="car-name-container" data-cy="car-name-container" >
            <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
            <p>
              5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
              예시) EAST, WEST, SOUTH, NORTH
            </p>
            <div class="d-flex">
              <input type="text" class="w-100 mr-2" placeholder="자동차 이름" />
              <button type="button" class="btn btn-cyan">확인</button>
            </div>
          </fieldset>
          <fieldset id="attempt-number-container" data-cy="attempt-number-container" hidden>
            <p>시도할 횟수를 입력해주세요.</p>
            <div class="d-flex">
              <input type="number" class="w-100 mr-2" placeholder="시도 횟수" />
              <button type="button" class="btn btn-cyan">확인</button>
            </div>
          </fieldset>
        </form>  
    `
  }

  setEvent() {
    const {inputNames, inputCount, startRace} = this.props;

    const $inputCarName = $('#car-name-container input');
    const $inputCount = $('#attempt-number-container input');
    const $carNameContainer = $('#car-name-container');
    const $attemptNumberConatainer =$('#attempt-number-container')
    

    this.addEvent('click', '#car-name-container button', () => {
      const isValid = inputNames($inputCarName.value);
      if (isValid) {
        $('#car-name-container').disabled = true; 
        $attemptNumberConatainer.hidden = false;
        return;
      }
      $inputCarName.value = '';  
    })

    this.addEvent('keydown', '#car-name-container input', ({ key }) => {
      if (key !== 'Enter') return;
      const isValid = inputNames($inputCarName.value);
      
      if (isValid) {
        $carNameContainer.disabled = true;
        $attemptNumberConatainer.hidden = false;
        return;
      }
      $inputCarName.value = '';
    })
    
    this.addEvent('click', '#attempt-number-container button', () => {
      const isValid = inputCount(Number($inputCount.value));
      
      if (isValid) {
        $attemptNumberConatainer.disabled = true;
        startRace();
        return;
      }
      $inputCount.value = '';
    })

    this.addEvent('keydown', '#attempt-number-container input', ({ key }) => {
      if (key !== 'Enter') return;
      const isValid = inputCount(Number($inputCount.value));
      
      if (isValid) {
        $attemptNumberConatainer.disabled = true;
        startRace();
        return;
      }
      $inputCount.value = '';
    })
  }
}
