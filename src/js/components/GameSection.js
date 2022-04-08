export default class GameSection extends HTMLElement {
  #template = /*html*/ `
  <section class="d-flex justify-center mt-5 hidden" name="game-section">
    <div class="title text-center">
      <h4>게임을 시작합니다!</h4>
    <div>
    <div class="mt-4 d-flex hidden">
      <div class="mr-2">
        <div class="car-player">EAST</div>
        <div class="forward-icon mt-2">⬇️️</div>
        <div class="forward-icon mt-2">⬇️️</div>
      </div>
      <div class="mr-2">
        <div class="car-player">WEST</div>
        <div class="forward-icon mt-2">⬇️️</div>
      </div>
      <div class="mr-2">
        <div class="car-player">SOUTH</div>
        <div class="d-flex justify-center mt-3">
          <div class="relative spinner-container">
            <span class="material spinner"></span>
          </div>
        </div>
      </div>
      <div class="mr-2">
        <div class="car-player">NORTH</div>
        <div class="d-flex justify-center mt-3">
          <div class="relative spinner-container">
            <span class="material spinner"></span>
          </div>
        </div>
      </div>
    </div>
  </section>`;

  constructor() {
    super();
    this.insertAdjacentHTML('afterbegin', this.#template);
  }
}

customElements.define('game-section', GameSection);
