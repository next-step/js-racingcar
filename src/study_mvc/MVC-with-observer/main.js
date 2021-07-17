import Controller from './Controller.js';
import Model from './model.js';
import InputView from './InputView.js';
import HeadingView from './headingView.js';
import ListView from './ListView.js';

class Main {
	constructor() {
		const model = new Model();
		const controller = new Controller(model);
		const inputView = new InputView(controller);
		const headView = new HeadingView(controller);
		const listView = new ListView(controller);
	}
}
new Main();
