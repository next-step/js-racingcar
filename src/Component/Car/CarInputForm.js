import { ERROR, EVENT } from '../../Constants/Constans.js';
import Component from '../../core/Component/Component.js';
import { actions } from '../../modules/actions.js';
import { filterCarName, isVaildCarName } from '../../util/carUtil.js';
import { delegate, qs } from '../../util/helper.js';

class CarInputForm extends Component {
  constructor($target, $props, store) {
    super($target, $props, store);
  }

  setEvent() {
    delegate(this.$target, EVENT.CLICK, '.btn', (event) => {
      const $input = qs('input', event.target.closest('.d-flex'));

      if ($input.type === 'text') {
        const cars = filterCarName($input.value);
        if (!isVaildCarName(cars))
          return alert(ERROR.CAR_NAME_MUST_FIVE_CHAR_LESS);

        const carObj = cars.map((carName) => {
          return {
            carName,
            carStates: [],
          };
        });

        return this.$store.dispatch(actions.SET_CARS_NAME(carObj));
      }

      if ($input.type === 'number') {
        const times = Number($input.value);
        return this.$store.dispatch(actions.SET_PLAY_TIMES(times));
      }
    });
  }

  template() {
    return `
        <form>
          <fieldset>
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
          <fieldset>
            <p>시도할 횟수를 입력해주세요.</p>
            <div class="d-flex">
              <input type="number" class="w-100 mr-2" placeholder="시도 횟수" />
              <button type="button" class="btn btn-cyan">확인</button>
            </div>
          </fieldset>
        </form>
    `;
  }
}

export default CarInputForm;
