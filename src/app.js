import App from './core/App.js';
import AttemptForm from './controller/Attempt/Form.js';
import CarPlayerList from './controller/CarPlayer/List.js';
import CarPlayerNameForm from './controller/CarPlayer/NameForm.js';
import Result from './controller/Result.js';
import Winner from './controller/Winner.js';

const state = {
  carPlayerNames: [],
  racingSteps: {},
  attempt: 0,
  winners: [],
};

function main() {
  const app = new App(state);
  app.useController(CarPlayerList);
  app.useController(CarPlayerNameForm);
  app.useController(AttemptForm);
  app.useController(Result);
  app.useController(Winner);

  app.render();
}

main();
