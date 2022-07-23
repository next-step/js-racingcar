class View {
  _target;

  constructor(target) {
    this._target = target;
  }

  show() {
    this._target.style.display = null;
  }

  hide() {
    this._target.style.display = 'none';
  }
}

export default View;
