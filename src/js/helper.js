export const qs = (selector, target = document) => target.querySelector(selector);
export const $delegate = ($parent, selector, eventType, callback) => {
	const childern = [...$parent.querySelectorAll(selector)];
	const isTarget = (target) => childern.includes(target) || target.closest(selector);
	$parent.addEventListener(eventType, (event) => {
		if (!isTarget(event.target)) return false;
		callback(event);
	});
};
