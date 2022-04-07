const CarStatus = Object.freeze({
  STOP: 'STOP',
  MOVING: 'MOVING',
});

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function moveTemplate() {
  const $template = document.createElement('template');
  $template.innerHTML = `<div class="forward-icon mt-2">⬇️️</div>`;
  return $template.content.firstChild;
}

function stopTemplate() {
  const $template = document.createElement('template');
  $template.innerHTML = `<div class="d-flex justify-center mt-3">
                      <div class="relative spinner-container">
                        <span class="material spinner"></span>
                      </div>
                    </div>`;
  return $template.content.firstChild;
}

export class Car {
  #name;
  #status;
  #target;

  constructor({ name, target }) {
    this.#name = name;
    this.#target = target;
    this.#status = CarStatus.STOP;
    this.#stop();
  }

  #handleMove() {
    if (this.#status === CarStatus.STOP) {
      this.#removeStop();
    }

    this.#move();
    this.#status = CarStatus.MOVING;
  }

  #handleStop() {
    if (this.#status !== CarStatus.STOP) {
      this.#stop();
    }

    this.#status = CarStatus.STOP;
  }

  #move() {
    this.#target.appendChild(moveTemplate());
  }

  #stop() {
    this.#target.appendChild(stopTemplate());
  }

  #removeStop() {
    const $stop = this.#target.querySelector('div.mt-3');
    this.#target.removeChild($stop);
  }

  static #isEnableMove() {
    const MOVABLE_RANGE_MIN_NUMBER = 0;
    const MOVABLE_RANGE_MAX_NUMBER = 9;
    const MOVABLE_NUMBER = 4;

    return (
      randomNumber(MOVABLE_RANGE_MIN_NUMBER, MOVABLE_RANGE_MAX_NUMBER) >=
      MOVABLE_NUMBER
    );
  }

  run() {
    if (Car.#isEnableMove()) {
      this.#handleMove();
      return;
    }
    this.#handleStop();
  }
}
