const refineName = (winners) => {
	return winners.reduce((acc, cur, idx) => {
		if (idx !== winners.length - 1) {
			return (acc += `${cur}, `);
		}
		return (acc += cur);
	}, "");
};

export default refineName;
