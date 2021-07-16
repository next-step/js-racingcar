export const goOrStop = (number) => number >= 4;

export const genMatrix = (row, column) => {
	return Array.from(Array(row), () => Array(column).fill(goOrStop(Math.random() * 9)));
};

export const getWinner = (matrix, candidates) => {
	const row = matrix.length;
	const col = matrix[0].length;

	const res = Array(candidates.length).fill(0);

	for (let j = 0; j < col; j++) {
		for (let i = 0; i < row; i++) {
			res[j] += matrix[i][j];
		}
	}

	let maxCnt = 0;
	for (const goCnt of res) {
		maxCnt = Math.max(maxCnt, goCnt);
	}

	return Array.from(candidates)
		.filter((name, index) => res[index] === maxCnt)
		.join(', ');
};
