import hide from './hide.js';

export default function resetAttemptsCount() {
  const attemptsCount = document.querySelector('.attempts-count');
  const attemptsCountButton = document.querySelector('.btn-attempts-count');
  const attemptsWrapper = document.querySelector('.attempts-wrapper');

  attemptsCount.value = null;
  attemptsCount.removeAttribute('disabled')
  attemptsCountButton.removeAttribute('disabled')
  hide(attemptsWrapper);
}