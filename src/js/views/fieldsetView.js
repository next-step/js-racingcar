const showFieldset = function (fieldsetElement) {
	fieldsetElement.hidden = false
	fieldsetElement.querySelector('input').focus()
}

const hideFieldset = function (fieldsetElement) {
	fieldsetElement.hidden = true
}

const freezeFieldset = function (fieldsetElement) {
	fieldsetElement.disabled = true
}

export default {
	freezeFieldset,
	showFieldset,
	hideFieldset,
}
