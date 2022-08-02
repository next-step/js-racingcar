const showFieldset = function (fieldsetElement) {
	fieldsetElement.hidden = false
	fieldsetElement.querySelector('input').focus()
}

const hideFieldset = function (fieldsetElement) {
	fieldsetElement.hidden = true
}

export default {
	showFieldset,
	hideFieldset,
}
