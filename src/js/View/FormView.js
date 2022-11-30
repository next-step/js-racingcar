import { withErrorHandling } from '../utils';
import View from './View';

export default class FormView extends View {
 constructor(target, model) {
  super(target);
  this.model = model;
  this.$carNameFieldset = this.$target.querySelector(
   'fieldset[name="car-name"]'
  );
  this.$raceCountFieldset = this.$target.querySelector(
   'fieldset[name="racing-count"]'
  );
 }

 setEvent() {
  this.addEvent('click', 'fieldset[name="car-name"] button', (e) => {
   this.model.setCarNames(e.target.previousElementSibling.value.split(','));
   this.$carNameFieldset.disabled = true;
   this.$raceCountFieldset.classList.remove('hidden');
  });

  this.addEvent('submit', 'form', (e) => {
   e.preventDefault();
   for (const el of e.target) {
    if (el.value && el.name === 'racing-count') this.model.play(+el.value);
   }
   this.$raceCountFieldset.disabled = true;
  });
 }

 getTemplate() {
  return String.raw` <form>
    <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
    <fieldset name="car-name">
      <legend>
        5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
        예시) EAST, WEST, SOUTH, NORTH
      </legend>
      <div class="d-flex">
        <input name="car-name" type="text" class="w-100 mr-2" placeholder="자동차 이름" />
        <button type="button" class="btn btn-cyan">확인</button>
      </div>
    </fieldset>
    <fieldset name="racing-count" class="hidden">
      <legend>시도할 횟수를 입력해주세요.</legend>
      <div class="d-flex">
        <input name="racing-count" type="number" class="w-100 mr-2" placeholder="시도 횟수" />
        <button type="submit" class="btn btn-cyan">확인</button>
      </div>
    </fieldset>
  </form>`;
 }
}
