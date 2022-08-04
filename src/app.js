import App from './core/App.js';
import AttemptForm from './controller/AttemptForm.js';
import CarPlayerList from './controller/CarPlayerList.js';
import CarPlayerNameForm from './controller/CarPlayerNameForm.js';
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

  // NOTE: 초기 랜더링
  app.render();
}

main();
