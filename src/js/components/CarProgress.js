import Component from '../lib/component.js';
import store from '../store/index.js';
import el from '../utils/dom.js';
import { $, delay } from '../utils/utils.js';

export default class CarProgress extends Component {
  static #forwardIcon = `<div class="forward-icon mt-2">⬇️️</div>`;
  static #spinner = `
            <div class="d-flex justify-center mt-3">
                <div class="relative spinner-container">
                    <span class="material spinner"></span>
                </div>
            </div>
    `;

  constructor(carName, progressArray) {
    super({ store });
    this.carName = carName;
    this.progressArray = progressArray;
  }

  async start() {
    this.$innerProgressBoard.appendChild(el(CarProgress.#spinner));
    this.progressArray.map(async (isForward, index) => {
      await delay(1000 * index);

      if (index === this.progressArray.length - 1) {
        this.$innerProgressBoard.lastChild.remove();
        if (isForward) this.$innerProgressBoard.appendChild(el(CarProgress.#forwardIcon));
        return;
      }

      if (isForward) {
        this.$innerProgressBoard.lastChild.remove();
        this.$innerProgressBoard.appendChild(el(CarProgress.#forwardIcon));
        this.$innerProgressBoard.appendChild(el(CarProgress.#spinner));
      }
    });
  }

  render() {
    this.$element = el(`
        <div class="mr-2 progress-board-inner" id=${this.carName}>
          <div class="car-player">${this.carName}</div>
        </div>
    `);

    $('.progress-board').appendChild(this.$element);

    this.$innerProgressBoard = $(`#${this.carName}`);
  }
}
