import BaseInput from '../Base/Input.js';

export default class ViewAttemptInput extends BaseInput {
  constructor(app) {
    const $input = document.querySelector('#input-attempt');
    super(app, $input);
  }
}
