export default function getResult(cars) {
  const maxScore = Math.max(...(Array.from(cars).map(it => Number(it.dataset.forwardCount))));
  const maxForwardPlayer = Array.from(cars)
  .filter(it => Number(it.dataset.forwardCount) === maxScore)
  .map(it => it.innerText);

  return maxForwardPlayer;
}