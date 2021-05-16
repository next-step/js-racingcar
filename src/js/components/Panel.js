import {
  MESSAGE,
  MINIMUM_COUNT,
  NAME_LIMIT_LENGTH, NAME_MINIMUM_LENGTH,
  TEMPLATE
} from '../utils/constant.js'
import {selector} from "../utils/util.js";
import RacingPanel from "./RacingPanel.js";

class Panel {
  constructor(parent) {
    this.$parent = parent
    this._render()
  }

  _render = () => {
    this.$parent.innerHTML = ''
    this.$parent.insertAdjacentHTML('afterbegin', TEMPLATE.INPUT_NAME_COUNT)
    this._addDomEvent()
  }

  _addDomEvent = () => {
    selector('#game-input-panel-component', this.$parent).addEventListener('click', this._handlePanelClick)
    selector('#game-result-component').addEventListener('click', this._restart)
  }

  _handlePanelClick = ({target}) => {
    if (target.classList.contains('car-player-btn')) return this._addCarPlayers(target.closest('.add-car-players'))
    if (target.classList.contains('play-count-btn')) return this._inputRacingCount(target.closest('.input-racing-count'))
  }

  _addCarPlayers = (target) => {
    const inputValues = selector('input', target).value.split(',').map(name => name.trim())
    if (inputValues.length > 0 && this._isValidName(inputValues)) {
      this.carNames = inputValues.map((name) => ({name}))
      return this._showCountPanel()
    }

    alert(MESSAGE.NO_VALID_CAR_NAMES)
  }

  _isValidName = (names) => {
    return names.every(name => (name.length > NAME_MINIMUM_LENGTH && name.length < NAME_LIMIT_LENGTH))
  }

  _showCountPanel = () => {
    selector('.car-racing-count').classList.remove('hidden')
  }

  _isValidCount = (count) => {
    return Number.isNaN(count) === false && count > MINIMUM_COUNT;
  }


  _inputRacingCount = (target) => {
    const { carNames } = this;
    const {value : count} = selector('input', target);
    if (this._isValidCount(count)) {
      return new RacingPanel({
        carNames,
        count,
      })
    }

    alert(MESSAGE.NO_VALID_COUNT);
  }

  _restart = ({target}) => {
    if (target.classList.contains('restart-racing')) {
      this._render();
    }
  }
}

export default Panel;
