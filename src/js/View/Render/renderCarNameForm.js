import Form from '../Component/Form/Form.js';

import { Component, render } from '../Component/Component.js';
import { selector } from '../../util/consts.js';

const renderCarNameForm = () => {
  render(selector('#app'), Component.create(Form()));
};

export default renderCarNameForm;
