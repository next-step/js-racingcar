import { $ } from '../utils/dom.js';

export default function GameProcess({ initState }) {
  this.$gameProcess = $('.game-process-container');
  this.$carsContainer = $('.cars-container');

  this.state = initState;
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const { cars, raceTimes } = this.state;

    this.$carsContainer.classList.toggle('hidden', cars.length === 0 || raceTimes === 0);
  };
}
