const checkValidity = (string) => {
	const splittedStrings = string.split(",");
	const refinedString = [];
	for (let i = 0; i < splittedStrings.length; i++) {
		const splittedString = splittedStrings[i].trim();
		if (splittedString.length > 5 || splittedString.length < 1) {
			return [];
		}
		refinedString.push(splittedString);
	}
	return refinedString;
};

export default checkValidity;
