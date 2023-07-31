import RacingController from "./controllers/RacingController";
import RacingModel from "./model/RacingModel";
import RacingView from "./view/RacingView";

const gameModel = new RacingModel();
const gameView = new RacingView(gameModel);
const gameController = new RacingController(gameModel, gameView);

gameController.initCarNamesBeforeStartRacingGame();
