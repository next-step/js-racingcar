export function displayInput(input) {
  console.log(input);
}

export function displayForwardCar(car) {
  console.log(`${car.name} : ${"-".repeat(car.position)}`);
}

export function displayRace(cars) {
  cars.forEach((car) => {
    displayForwardCar(car);
  });
  console.log("");
}
