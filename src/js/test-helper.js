import Game from './Game.js';
import MatrixCreator from './MatrixCreator.js';

export const goOrStop = (number) => Game.goOrStop(number);

// matrix에 대한 테스트가 필요한 순간 class를 분리해야 하는게 아닌가라는 생각을 해야한다.

export const genMatrix = (row, col) => {
	return new MatrixCreator(row, col).matrix(0, 9);
};

export const getWinner = (matrix, candidates) => {
	const game = new Game(candidates, matrix.length, matrix);
	return game.winner;
};
