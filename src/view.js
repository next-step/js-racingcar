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

export function displayWinners(race) {
  console.log(
    `${race.winners.map((car) => car.name).join(", ")}가 최종 우승했습니다.`
  );
}
