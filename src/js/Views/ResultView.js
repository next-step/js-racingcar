import { View } from "../core/View.js";

class ResultView extends View {
  raceResultElement;
  resetButton;

  constructor() {
    const rootElement = document.getElementById('result-section');
    super(rootElement);
    this.raceResultElement = rootElement.getElementsByTagName('h2')[0].getElementsByTagName('span')[0];
    this.resetButton = rootElement.getElementsByTagName('button')[0];
  }

  init = () => {
    this.hide();
    this.raceResultElement.textContent = '';
  };

  setResult = (winners) => {
    this.raceResultElement.textContent = winners.join(', ');
  };
}

const resultView = new ResultView();

export { resultView };
