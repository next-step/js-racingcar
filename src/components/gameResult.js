import { $ } from '../utils/dom.js';

export default function GameResult({ initState }) {
  this.$gameResult = $('.game-result-container');

  this.state = initState;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {};

  this.render();
}
