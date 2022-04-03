import View from '../views/index.js';
import {
  inputCarNamesParsing,
  showGameTryCountSection,
  gameTryCountParsing,
} from '../actions/index.js';
import { $, $elements, $eventBindedComponent } from '../../@helper/index.js';

const Setup = $eventBindedComponent(({ Car, RacingGame, notify }) => {
  const _template = $elements(View.InputSection({ RacingGame }));

  const _events = [
    {
      type: 'click',
      callback: event => {
        event.preventDefault();
        if (!event.target.matches('[data-props="car-names-confirm-button"]')) return;
        const { value: carNames } = $('[data-props="car-names-input"]');
        try {
          const parsedCarNames = inputCarNamesParsing(carNames);
          const cars = parsedCarNames.map(carName => new Car().setName(carName));
          RacingGame.setCars(cars);

          showGameTryCountSection();
        } catch (error) {
          alert(error.message);
        }
      },
    },
    {
      type: 'click',
      callback: event => {
        event.preventDefault();
        if (!event.target.matches('[data-props="game-try-count-confirm-button"]')) return;
        const { value: gameTryCount } = $('[data-props="game-try-count-input"]');
        try {
          const validCount = gameTryCountParsing(gameTryCount);
          RacingGame.setTryCount(validCount);
          RacingGame.start();

          notify();
        } catch (error) {
          alert(error.message);
        }
      },
    },
  ];
  return [_template, _events];
});

export default Setup;
