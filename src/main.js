import RacingCarController from "./ui/RacingCarController.js";

async function main() {
  const racingCarController = new RacingCarController();
  await racingCarController.run();
}

main();
