export const printRacingInfo = cars => {
  console.log(cars.map(car => `${car.carName} : ${'-'.repeat(car.distance)}`).join('\n'));
  console.log();
};
