export const $ = function (selector) {
	return document.querySelector(selector)
}

export const getRandomInt = function (max, min) {
	return Math.floor(Math.random() * (max - min) + min)
}
