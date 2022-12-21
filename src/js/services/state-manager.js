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
    winner: [],
    observers: [],
  };

  resetState = {
    reset: true,
    observers: [],
  };

  constructor() {
    this.#setPlayerState();
    this.#setRoundState();
    this.#setWinnerState();
    this.#setResetState();
  }

  #setPlayerState() {
    this.playerState = new Proxy(this.playerState, {
      set(target, prop, value) {
        Reflect.set(target, prop, value);

        if ('player' === prop) {
          target.observers.forEach(fn => fn(value));
        }

        return true;
      },
    });
  }

  #setRoundState() {
    this.roundState = new Proxy(this.roundState, {
      set(target, prop, value) {
        Reflect.set(target, prop, value);

        if ('round' === prop) {
          target.observers.forEach(fn => fn(value));
        }

        return true;
      },
    });
  }

  #setWinnerState() {
    this.winnerState = new Proxy(this.winnerState, {
      set(target, prop, value) {
        Reflect.set(target, prop, value);

        if ('winner' === prop) {
          target.observers.forEach(fn => fn(value));
        }

        return true;
      },
    });
  }

  #setResetState() {
    this.resetState = new Proxy(this.resetState, {
      set(target, prop, value) {
        Reflect.set(target, prop, value);

        if ('reset' === prop) {
          target.observers.forEach(fn => fn(value));
        }

        return true;
      },
    });
  }
}
