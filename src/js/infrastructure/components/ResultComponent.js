import { $elements } from '../../@helper/dom.js';
import View from '../views/index.js';

const Result = () => {
  const $template = $elements(View.ResultSection);
  return $template;
};

export default Result;
