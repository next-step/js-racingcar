import CarRacingController from "./controllers/CarRacingController";

const readline = require("node:readline/promises").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const carRacingController = new CarRacingController(readline);

carRacingController.startRace();
