import { inputCarNames, inputGameTryCount } from '../actions/index.js';
import { $elements, $eventBindedComponent } from '../../@helper/dom.js';
import View from '../views/index.js';

const Setup = $eventBindedComponent(() => {
  const $template = $elements(View.InputSection);
  const $events = [
    { type: 'click', callback: inputCarNames },
    { type: 'click', callback: inputGameTryCount },
  ];
  return [$template, $events];
});

export default Setup;
