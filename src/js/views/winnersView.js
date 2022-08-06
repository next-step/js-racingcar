import { divSelector, ulSelector } from '../constant/selector.js'
import { $ } from '../utils.js'

const createWinnerNameElement = function ({ winnerName }) {
	const winnerNameElement = document.createElement('li')

	winnerNameElement.classList.add('winner-name')
	winnerNameElement.textContent = winnerName

	return winnerNameElement
}

const renderWinners = function ({ winners }) {
	const resultElement = $(divSelector.RESULT_WRAPPER)
	resultElement.hidden = false

	resultElement.querySelector(ulSelector.WINNER_NAME_LIST).innerHTML = winners
		.reduce(
			(acc, cur) =>
				acc + createWinnerNameElement({ winnerName: cur.name }).outerHTML + ',',
			''
		)
		.slice(0, -1)
}

export default {
	renderWinners,
}
