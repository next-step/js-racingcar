import { selector } from "../../util/consts.js";
import Form from "./Form.js";


const render = () => {
  const app = selector('#app')
  app.innerHTML = Form()
}

export default render;

