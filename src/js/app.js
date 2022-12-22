import RacingModel from "./models/racing.js";
import RacingController from "./controllers/racing.js";
import RacingView from "./views/racing.js";

function app() {
  const racingModel = new RacingModel();
  const racingController = new RacingController(racingModel);
  // eslint-disable-next-line no-unused-vars
  const racingView = new RacingView(racingController);
}

app();
