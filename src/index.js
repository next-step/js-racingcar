import { Race } from './domain/Race.js';
import { CarIO } from './view/CarIO.js';

async function main() {
  const carIO = new CarIO();

  console.log('실행결과');
  try {
    await carIO.inputCars();
    const race = new Race(carIO.cars);
    race.racingStart(carIO.showRacingResult);
    console.log(`${race.getWinner()} 가 최종 우승했습니다.`);
  } catch (error) {
    console.error(error.message);
  }
}

main();
