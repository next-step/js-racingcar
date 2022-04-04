const STOP = 'STOP';
const MOVING = 'MOVING';

export class Car {
  #name;

  #status;

  #target;

  constructor({ name, target }) {
    this.#name = name;
    this.#target = target;
    this.#handleStop();
  }

  #handleMove() {
    if (this.#status === STOP) {
      const $stop = this.#target.querySelector('div.mt-3');
      this.#target.replaceChild(Car.#move(), $stop);
    } else {
      this.#target.appendChild(Car.#move());
    }

    this.#status = MOVING;
  }

  #handleStop() {
    if (this.#status !== STOP) {
      this.#target.appendChild(Car.#stop());
    }

    this.#status = STOP;
  }

  static #move() {
    const $template = document.createElement('template');
    $template.innerHTML = `<div class="forward-icon mt-2">⬇️️</div>`;
    return $template.content.firstChild;
  }

  static #stop() {
    const $template = document.createElement('template');
    $template.innerHTML = `<div class="d-flex justify-center mt-3">
                      <div class="relative spinner-container">
                        <span class="material spinner"></span>
                      </div>
                    </div>`;
    return $template.content.firstChild;
  }

  static #isEnableMove() {
    return Math.floor(Math.random() * (9 - 2) + 1) >= 4;
  }

  run() {
    if (Car.#isEnableMove()) {
      this.#handleMove();
      return;
    }
    this.#handleStop();
  }
}
