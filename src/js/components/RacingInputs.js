import { $, $on } from '../utils/helpers.js';

// TODO: Input이 아닌 form으로 이름을 바꾸는건 어떨까?
export default function RacingInputs() {
  // NOTE: names input -> 이름 바꾸기
  this.$nameSection = $('.car-names');
  this.$namesInput = $('.car-names__input');
  this.$namesBtn = $('.car-names__btn');
  this.$trySection = $('.try-number');
  this.$tryNumInput = $('.try-number__input');
  this.$tryNumBtn = $('.try-number__btn');

  this.checkValidOfNames = (names) =>
    names.every((name) => name.length > 0 && name.length <= 5);

  this.checkValidOfTryNum = (num) => num > 0;

  this.getNames = () => {
    const names = this.$namesInput.value.split(',').map((name) => name.trim());
    if (!this.checkValidOfNames(names)) {
      this.$namesInput.value = '';
      alert(
        '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.'
      );
      return [];
    }
    this.$namesInput.disabled = true;
    this.$namesBtn.disabled = true;
    this.$trySection.classList.remove('hidden');
    return names;
  };

  this.getRounds = () => {
    if (!this.checkValidOfTryNum(+this.$tryNumInput.value)) {
      alert(
        '입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 1이상이어야 합니다.'
      );
      return false;
    }
    this.$tryNumBtn.disabled = true;
    this.$tryNumInput.disabled = true;
    return +this.$tryNumInput.value;
  };

  this.reset = () => {
    this.$trySection.classList.add('hidden');
    this.$namesInput.value = '';
    this.$tryNumInput.value = '';
    this.$tryNumBtn.disabled = false;
    this.$tryNumInput.disabled = false;
    this.$namesInput.disabled = false;
    this.$namesBtn.disabled = false;
  };
}
