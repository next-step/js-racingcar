import { executeReadInputCar, executeReadInputTotalLap, errorFallback, endPrompter } from './race/index';
import { Car, CarRaceOrganizer } from './classes/index';

const getValidCarsFromPrompt = async () => {
  try {
    const inputCars = await executeReadInputCar();
    const cars = inputCars.map((car) => new Car(car));
    CarRaceOrganizer.validateDuplicateCarName(cars);
    return cars;
  } catch (error) {
    errorFallback(error);
    return getValidCarsFromPrompt();
  }
};

const getValidTotalLapFromPrompt = async () => {
  try {
    const inputTotalLap = await executeReadInputTotalLap();
    CarRaceOrganizer.validateTotalLap(inputTotalLap);
    return inputTotalLap;
  } catch (error) {
    errorFallback(error);
    return getValidTotalLapFromPrompt();
  }
};

const startGame = async () => {
  try {
    const cars = await getValidCarsFromPrompt();
    const totalLap = await getValidTotalLapFromPrompt();
    const carRaceOrganizer = new CarRaceOrganizer(cars, totalLap);
    carRaceOrganizer.runFullRace();
  } catch (error) {
    errorFallback(error);
    startGame();
  } finally {
    endPrompter();
  }
};

export default startGame;
