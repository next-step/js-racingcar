import { executeReadInputCar, executeReadInputTotalLap, errorFallback, endPrompter } from './prompter';
import { Car, CarRaceOrganizer } from '../classes/index';

const getValidCarsFromPrompt = async () => {
  try {
    const inputCars = await executeReadInputCar();
    const cars = inputCars.map((car) => new Car(car));
    CarRaceOrganizer.validateDuplicateCarName(cars);
    return cars;
  } catch (error) {
    errorFallback(error);
    getValidCarsFromPrompt();
  }
};

const getValidTotalLapFromPrompt = async () => {
  try {
    const inputTotalLap = await executeReadInputTotalLap();
    CarRaceOrganizer.validateTotalLap(inputTotalLap);
    return inputTotalLap;
  } catch (error) {
    errorFallback(error);
    getValidTotalLapFromPrompt();
  }
};

const startRaceGame = async () => {
  try {
    const cars = await getValidCarsFromPrompt();
    const totalLap = await getValidTotalLapFromPrompt();
    const carRaceOrganizer = new CarRaceOrganizer(cars, totalLap);
    carRaceOrganizer.runFullRace();
    return {
      history: carRaceOrganizer.history,
      winners: carRaceOrganizer.winners
    };
  } catch (error) {
    errorFallback(error);
    startRaceGame();
  } finally {
    endPrompter();
  }
};

export default startRaceGame;
