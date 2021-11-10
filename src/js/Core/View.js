import { qs } from '../helper.js';

export default class View {
	constructor($component) {
		this.$target = qs(`[data-component='${$component}']`);
	}
	template = (model) => {};
	addEvents = () => {};
	update = (model) => {
		this.template(model);
	};
	show = () => {
		this.$target.classList.remove('d-hidden');
		return this.$target;
	};
	hidden = () => {
		this.$target.classList.add('d-hidden');
		return this.$target;
	};
}
