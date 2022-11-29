export default function getMaxScore() {
  const cars = Array.from(document.querySelectorAll('.car-player'));
  const forwardCounts = cars.map(it => Number(it.dataset.forwardCount));
  
  return Math.max(...forwardCounts);
}