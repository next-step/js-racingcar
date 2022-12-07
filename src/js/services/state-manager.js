export class StateManager {
  playerState = {
    player: [],
    observers: [],
  };

  roundState = {
    round: null,
    observers: [],
  };

  constructor() {
    this.setPlayerState();
    this.setRoundState();
  }

  setPlayerState() {
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

  setRoundState() {
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
}
