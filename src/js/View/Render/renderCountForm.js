import Fieldset from '../Component/Form/Fieldset.js';

import { Component, render } from '../Component/Component.js';
import { selector } from '../../util/consts.js';

const renderCountForm = () => {
  render(
    selector('.racing-form'),
    Component.create(Fieldset('count', '시도 횟수'))
  );
};

export default renderCountForm;
