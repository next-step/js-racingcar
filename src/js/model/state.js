export default class State {
  constructor(player, count) {
    this.player = player;
    this.count = count;
  }

  get player() {
    return this._player;
  }

  set player(value) {
    return this._player = value;
  }

  get count() {
    return this._count;
  }

  set count(value) {
    return this._count = value;
  }
}