import { $elements } from '../../@helper/index.js';
import View from '../views/index.js';

const Game = ({ RacingGame }) => {
  const $template = $elements(View.GameSection({ cars: RacingGame.getCars() }));
  return $template;
};

export default Game;
