const template = (winners) => {
  winners = winners.join(",");
  return `🏆 최종 우승자는 ${winners} 🏆 `;
};

export default template;
