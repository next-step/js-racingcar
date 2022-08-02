import CarPlayer from '../view/CarPlayer.js';
import BaseController from './BaseController.js';

export default class CarPlayerList extends BaseController {
  constructor(state) {
    super(state);
    this.$carPlayerList = document.querySelector('#car-player-list');
  }

  render() {
    const { carPlayerNames } = this.state;
    const carPlayerList = carPlayerNames.reduce((acc, name) => acc + CarPlayer(name), '');

    this.$carPlayerList.innerHTML = carPlayerList;
  }
}
