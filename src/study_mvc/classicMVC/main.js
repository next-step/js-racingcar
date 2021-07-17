import Controller from './Controller.js';
import Model from './model.js';
import View from './view.js';

class Main {
	constructor() {
		const model = new Model();
		const controller = new Controller(model);
		const view = new View(controller);
	}
}
new Main();
