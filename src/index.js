function randomNumber() {
  return Math.floor(Math.random() * 10);
}

function isInvalid(carNames) {
  const names = carNames.split(',').map((name) => name.trim());
  return names.some((name) => name === '' || name.length > 5);
}

function carPositions(cars) {
  cars.forEach((car) => {
    console.log(`${car.name}: ${'-'.repeat(car.position)}`);
  });
}

function getRoundResult(cars) {
  const roundResults = [];
  cars.forEach((car) => {
    const randomValue = randomNumber();
    if (randomValue >= 4) {
      car.position++;
    }
    roundResults.push(`${car.name}: ${'-'.repeat(car.position)}`);
  });
  return roundResults;
}

function getWinners(cars) {
  const maxPosition = Math.max(...cars.map((car) => car.position));
  return cars.filter((car) => car.position === maxPosition).map((car) => car.name);
}

function raceResultTxtSet(winners) {
  console.log(`\n${winners.join(', ')}가 최종 우승했습니다.`);
  const raceResultTxt = document.getElementById('raceResult');
  raceResultTxt.innerHTML = `\n${winners.join(', ')}가 최종 우승했습니다.`;
}

function carRace(names) {
  const cars = names.split(',').map((name) => ({ name: name.trim(), position: 0 }));
  const rounds = 5;
  for (let round = 1; round <= rounds; round++) {
    console.log(`<Round ${round}>`);
    const roundResults = getRoundResult(cars);
    roundResults.forEach((result) => console.log(result));
  }
  carPositions(cars);
  const winners = getWinners(cars);
  raceResultTxtSet(winners);
}

function startRace() {
  const carNames = document.getElementById('carNames').value;
  if (isInvalid(carNames)) {
    alert('자동차 이름은 쉼표(,)로 구분하며, 5자 이하만 가능합니다.');
    return;
  }
  carRace(carNames);
}

export { isInvalid };
