export default function getMaxForwardPlayerName(maxScore) {
  const cars = Array.from(document.querySelectorAll('.car-player'));
  const result = cars
  .filter(it => Number(it.dataset.forwardCount) === maxScore)
  .map(it => it.innerText);

  return result;
}