import ValidateInput from './ValidateInput.js';

export default class AttemptInput extends ValidateInput {
  constructor() {
    const $input = document.querySelector('#input-attempt');
    super($input);
  }
}
