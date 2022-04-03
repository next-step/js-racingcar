import Form from "../Component/Form/Form.js";

import { selector } from "../../util/consts.js";
import { render, Component } from "../render.js"

const renderCarNameForm = () => {
  const app = selector('#app');
  render(app, Component.create(Form()))
}

export default renderCarNameForm;
