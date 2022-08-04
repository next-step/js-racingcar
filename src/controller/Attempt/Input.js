import BaseInput from '../BaseInput.js';

export default class AttemptInput extends BaseInput {
  constructor() {
    const $input = document.querySelector('#input-attempt');
    super($input);
  }
}
