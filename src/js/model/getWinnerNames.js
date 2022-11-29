import getMaxForwardPlayerName from '../ui/getMaxForwardPlayerName.js';
import getMaxScore from '../ui/getMaxScore.js';

export default function getWinnerNames() {
  const maxScore = getMaxScore();
  const winnerNames = getMaxForwardPlayerName(maxScore);
  
  return winnerNames;
}