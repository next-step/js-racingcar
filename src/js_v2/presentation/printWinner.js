export const winnerMessage = (values) => {
  const template = `🏆 최종 우승자: ${values.join(', ')} 🏆`;

  return template;
};

export function printWinner(winners) {
  console.log(winners);
  const resultWrapper = document.getElementById('result-wrapper');
  resultWrapper.style.display = 'block';
  resultWrapper.style.textAlign = 'center';

  const winner = document.querySelector('.winner');
  winner.innerHTML = winnerMessage(winners);
}