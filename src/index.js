import { View } from "./View";
import { Controller } from "./Controller";
import { App } from "./App";

function app() {
  const veiw = new View();
  const controller = new Controller();

  const app = new App(veiw, controller);

  app.start();
}

app();
