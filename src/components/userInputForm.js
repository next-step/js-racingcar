import { $ } from '../utils/dom.js';
import { validateCarNames } from '../validation.js';

export default function UserInputForm() {
  this.$userInputForm = $('.user-input-form-container');

  this.render = () => {
    this.$userInputForm.innerHTML = String.raw`
        <div>
          <section>
            <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
            <p>
              5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
              예시) EAST, WEST, SOUTH, NORTH
            </p>
          </section>
          <section>
            <div class="d-flex">
              <input data-cy="input-car-name" type="text" class="input-car-name w-100 mr-2" placeholder="자동차 이름" />
              <button data-cy="submit-car-name" type="submit" class="submit-car-name btn btn-cyan">확인</button>
            </div>
          </section>
          <section style="display: none;">
            <p>시도할 횟수를 입력해주세요.</p>
            <div class="d-flex">
              <input type="number" class="input-race-times w-100 mr-2" placeholder="시도 횟수" />
              <button type="submit" class="submit-race-times btn btn-cyan">확인</button>
            </div>
          </section>
        </div>
    `;
  };

  this.render();

  this.$carNameInput = $('.input-car-name');
  this.$carNameSubmitButton = $('.submit-car-name');

  this.handleSubmitCarNames = () => {
    const carNames = this.$carNameInput.value.split(',').map((carName) => carName.trim());

    try {
      validateCarNames(carNames);
    } catch (error) {
      alert(error.message);
      
    }
  };

  this.handleCarNameInput = (e) => {
    if (e.code === 'Enter') {
      this.handleSubmitCarNames();
    }
  };

  this.$carNameSubmitButton.addEventListener('click', this.handleSubmitCarNames);
  this.$carNameInput.addEventListener('keyup', this.handleCarNameInput);
}
