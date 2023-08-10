import CarRacingManager from "./controller/CarRacingManager.js";
import View from "./view/View.js";

const carRacingManager = new CarRacingManager();

const app = async () => {
  const names = await View.askNames();
  const totalRound = await View.askTotalRound();
  carRacingManager.gameStart(names, totalRound);
};

app();
