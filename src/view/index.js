export function linebreak() {
  console.log();
}

export function printWinners(winners) {
  console.log(
    `${winners
      .map((winner) => winner.information.name)
      .join(', ')}가 최종 우승했습니다.`,
  );
}

export function printCurrentRound(cars) {
  cars.forEach((car) => {
    const { name, location } = car.information;
    console.log(`${name} : ${'-'.repeat(location)}`);
  });
  linebreak();
}
