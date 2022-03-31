import { $elements } from '../../@helper/dom.js';
import View from '../views/index.js';

const Game = () => {
  const $template = $elements(View.GameSection);
  return $template;
};

export default Game;
