import { divSelector, titleSelector } from '../constant/selector.js'
import { $ } from '../utils.js'

export const renderWinners = function ({ winners }) {
	const resultElement = $(divSelector.RESULT_WRAPPER)
	resultElement.hidden = false

	const winnersName = winners
		.reduce((acc, cur) => acc + ` ${cur.name},`, '')
		.slice(0, -1)

	resultElement.querySelector(
		titleSelector.WINNERS
	).textContent = `🏆 최종 우승자 : ${winnersName} 🏆`
}
