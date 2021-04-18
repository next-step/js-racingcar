const template = (tagName, props) => {
	const dom = document.createElement(tagName);
	for (let key in props) {
		if (key.startsWith("on")) {
			dom.addEventListener(key.substring(2).toLowerCase(), props[key]);
		} else if (key.startsWith("data")) {
			dom.dataset[key.substring(4).toLowerCase()] = props[key];
		} else if (key.startsWith("text")) {
			dom.appendChild(document.createTextNode(props[key]));
		} else {
			dom.setAttribute(key, props[key]);
		}
	}

	return dom;
};

export default template;
