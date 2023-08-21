import PrintRoundResult from "./PrintRoundResult";
import PrintGameWinner from "./PrintGameWinner";

const TOTAL_ROUND_NUMBER = 5;

const RacingGame = (cars) => {
  console.log("\n경주 시작!\n");
  for (let i = 0; i < TOTAL_ROUND_NUMBER; i++) {
    cars.map(($car) => $car.runRound());
    PrintRoundResult(cars);
  }
  PrintGameWinner(cars);
};

export default RacingGame;
