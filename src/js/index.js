import MainController from './controller/MainController.js';
import View from './view/View.js';
import { $ } from './util/dom.js';

class App extends View {
  #template = /*html*/ `
    <section id="racingcarFormSection" class="d-flex justify-center mt-5">
      <div>
        <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
        <p>
          5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
          예시) EAST, WEST, SOUTH, NORTH
        </p>
        <form id="carNameFormSection"></form>
        <form id="tryCountFormSection"></form>
      </div>
    </section>
    <section id="playSection" class="d-flex justify-center mt-5"></section>
    <section id="winnerSection" class="d-flex justify-center mt-5"></section>
  `;

  constructor(el) {
    super(el);
    this.render();

    new MainController({
      carNameFormSection: $('#carNameFormSection'),
      tryCountFormSection: $('#tryCountFormSection'),
      playSection: $('#playSection'),
      winnerSection: $('#winnerSection')
    });
  }

  render() {
    this.$target.replaceChildren();
    this.$target.insertAdjacentHTML('beforeend', this.#template);
  }
}

new App($('#app'));
