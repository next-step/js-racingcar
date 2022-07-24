import { Game } from './controllers/index.js';
import { Car } from './models/index.js';
import { validateCarNames, validateCoin } from './validator.js';
import { FieldsetView, TrackView } from './views/index.js';

const carNameView = new FieldsetView(document.querySelector('#form-car-name'));
const carCoinView = new FieldsetView(document.querySelector('#form-car-coin'));
const trackView = new TrackView(document.querySelector('#track'));
const game = new Game(trackView);

carNameView.addButtonClickListener((value) => {
  try {
    validateCarNames(value);

    carNameView.disable();
    carCoinView.show();
  } catch (error) {
    alert(error.message);
  }
});

carCoinView.addButtonClickListener((value) => {
  const coin = Number(value);

  try {
    validateCoin(value);

    carCoinView.disable();

    const cars = carNameView.value
      .split(',')
      .map((name) => name.trim())
      .map((name) => new Car(name, coin));

    trackView.show();
    game.setCars(cars);
    game.start(coin);
  } catch (error) {
    alert(error.message);
  }
});
