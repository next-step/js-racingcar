export class StateManager {
  playerState = {
    value: [],
    observers: [],
  };

  roundState = {
    value: null,
    observers: [],
  };

  winnerState = {
    value: [],
    observers: [],
  };

  resetState = {
    value: true,
    observers: [],
  };

  constructor() {
    this.playerState = this.#setState(this.playerState);
    this.roundState = this.#setState(this.roundState);
    this.winnerState = this.#setState(this.winnerState);
    this.resetState = this.#setState(this.resetState);
  }

  #setState(state) {
    return new Proxy(state, {
      set(target, prop, value) {
        Reflect.set(target, prop, value);

        if ('value' === prop) {
          target.observers.forEach(fn => fn(value));
        }

        return true;
      },
    });
  }
}
