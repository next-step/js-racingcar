export const createEl = (tagName, className, text) => {
	const $el = document.createElement(tagName);
	$el.className = className;
	$el.textContent = text;
	return $el;
};
