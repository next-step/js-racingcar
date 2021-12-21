import Car from './Car';

export const getWinners = (cars: Car[]) => {
  const scores = cars.map((car) => car.getScore());
  const winnerScore = Math.max(...scores);

  return cars.filter((car) => car.getScore() === winnerScore).map((car) => car.carName);
};
