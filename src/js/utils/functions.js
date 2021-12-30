export const rand = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const canMove = () => {
	return rand(0, 9) >= 4 ? true : false;
};
