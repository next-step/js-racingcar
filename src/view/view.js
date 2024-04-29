export function renderRacingBoard(cars) {
  console.log(cars.map((car) => {
    return `${car.name} : ${"-".repeat(car.position)}`;
  }).join("\n"));
  console.log("\n");
}

export function renderWinners(winners) {
    console.log(`${winners.map((car) => (car.name)).join(", ")}가 최종 우승했습니다.`);
}