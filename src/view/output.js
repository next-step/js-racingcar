function formatResults(results) {
  return results.flatMap((round) =>
    round
      .map(({ name, location }) => `${name} : ${"-".repeat(location)}`)
      .concat("")
  );
}

export function consoleRaceResult(results, winners) {
  console.log("\n실행 결과");
  console.log(formatResults(results).join("\n"));
  console.log(`${winners.join(", ")}가 최종 우승했습니다.`);
}
