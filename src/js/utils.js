export const max = (numberArry) => {
	let maxCnt = 0;
	for (const num of numberArry) {
		maxCnt = Math.max(maxCnt, num);
	}
	return maxCnt;
};
