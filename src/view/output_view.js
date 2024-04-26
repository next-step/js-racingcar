export const printCar = (car) => {
  console.log(`${car.name}: ${'-'.repeat(car.position)}`);
};

export const printWinners = (winners) => {
  console.log(`${winners.join(', ')}가 최종 우승했습니다.`);
};
