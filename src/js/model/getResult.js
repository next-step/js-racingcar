export default function getResult() {
  const players = document.querySelectorAll('.car-player');

  const maxScore = Math.max(...(Array.from(players).map(it => Number(it.dataset.forwardCount))));

  const maxForwardPlayer = Array.from(players).filter(it => Number(it.dataset.forwardCount) === maxScore).map(it => it.innerText);

  return maxForwardPlayer;
}