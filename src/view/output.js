function formatRaceResults(results) {
  let result = [];

  results.forEach((round) => {
    round.forEach(({ name, location }) => {
      result.push(`${name} : ${'-'.repeat(location)}`);
    });

    result.push('');
  });

  return result;
}

function getWinner(results) {
  const lastRound = results[results.length - 1];

  const maxLocation = Math.max(...lastRound.map((car) => car.location));
  const winners = lastRound
    .filter((car) => car.location === maxLocation)
    .map((car) => car.name);

  return winners;
}

export function consoleRaceResult(results) {
  console.log('\n실행 결과');

  const formattedResult = formatRaceResults(results);
  formattedResult.forEach((message) => console.log(message));

  const winners = getWinner(results);
  console.log(`${winners.join(', ')}가 최종 우승했습니다.`);
}
