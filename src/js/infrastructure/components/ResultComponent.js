import { $elements } from '../../@helper/index.js';
import View from '../views/index.js';

const Result = ({ RacingGame }) => {
  const $template = $elements(View.ResultSection({ RacingGame }));
  return $template;
};

export default Result;
