const MIN_WINNER_DISTANCE = 1;
const WINNING_RESULT_MESSAGE = Object.freeze({
  NO_WINNER: "우승자 없음",
  PRINT_WINNER: (winnerName) => `${winnerName}가 최종 우승했습니다.`,
});
const PrintGameWinner = (cars) => {
  const findMaxDistance = cars.reduce((acc, cur) => Math.max(acc, cur.getPosition()), 0);
  if (MIN_WINNER_DISTANCE > findMaxDistance) return console.log(WINNING_RESULT_MESSAGE.NO_WINNER);

  const winnerName = cars.reduce((acc, cur) => {
    if (cur.getPosition() === findMaxDistance) return acc + cur.getName() + ",";
    return acc;
  }, "");

  console.log(WINNING_RESULT_MESSAGE.PRINT_WINNER(winnerName.slice(0, -1)));
};

export default PrintGameWinner;
