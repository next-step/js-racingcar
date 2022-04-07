import SubForm from './SubForm.js';

import { TITLE } from '../../../util/consts.js';

const Fieldset = (name, placeholder) => {
  return `
  <fieldset>
    ${name === 'name' ? `<h1 class="text-center">🏎️ 자동차 경주 게임</h1>` : ''}
    ${
      name === 'name'
        ? `<p>${TITLE.CAR_NAME}</p>`
        : `<p>${TITLE.RACING_COUNT}</p>`
    }
    ${SubForm(name, placeholder)}
  </fieldset>
  `;
};

export default Fieldset;
