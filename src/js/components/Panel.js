import {TEMPLATE} from "../utils/constant.js";
import {selector} from "../utils/util.js";
import Cars from "./Cars.js";

class Panel {
  constructor(parent) {
    this.$parent = parent
    this.render()
  }

  render = () => {
    this.$parent.innerHTML = ''
    this.$parent.insertAdjacentHTML('afterbegin', TEMPLATE.INPUT_NAME_COUNT)
    this.addDomEvent()
  }

  addDomEvent = () => {
    selector('#game-input-panel-component', this.$parent).addEventListener('click', this.handlePanelClick)
    selector('#game-result-component').addEventListener('click', this.restart)
  }

  handlePanelClick = ({target}) => {
    if (target.classList.contains('car-player-btn')) {
      return this.addCarPlayers(target.closest('.add-car-players'))
    }

    if (target.classList.contains('play-count-btn')) {
      return this.inputRacingCount(target.closest('.input-racing-count'))
    }
  }

  makeId = (name) => {
    return Date.now() + name
  }

  addCarPlayers = (target) => {
    const inputValues = selector('input', target).value.split(',')
    if (inputValues.length > 0 && this.isValidName(inputValues)) {
      this.carNames = inputValues.map(name => ({name, count: 0, id: this.makeId(name)}))
      return this.showCountPanel()
    }

    alert('message')

  }

  isValidName = (names) => {
    return names.every(name => (name.length > 0 && name.length < 6))
  }

  showCountPanel = () => {
    selector('.car-racing-count').classList.remove('hidden')

  }

  isValidCount = (count) => {
    return isNaN(count) === false && count > 0
  }


  inputRacingCount = (target) => {
    const { carNames } = this;
    const count = selector('input', target).value
    if (this.isValidCount(count)) {
      new Cars({
        carNames,
        count,
      })
    }
  }

  restart = ({target}) => {
    if (target.classList.contains('restart-racing')) {
      this.render();
    }
  }
}

export default Panel;
