import App from "./App.js";
import { $ } from "./utils/dom.js";

const render = ($root) => {
  const app = new App($root);
  app.render();
};

window.addEventListener("DOMContentLoaded", () => render($("#app")));
