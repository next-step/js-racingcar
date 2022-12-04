import { nameComponent } from './components/nameComponent.js';
import { roundComponent } from './components/roundComponent.js';
import { RaceComponent } from './components/race.component.js';

import { View } from './views/view.js';
import { Validator } from './common/validator.js';
import stateService from './services/state.service.js';

export class App {
    container;

    constructor() {
        this.container = {
            view: new View(),
            validator: new Validator(),
            stateService: stateService()
        }
        this.init();
    }

    init() {
        const name = new nameComponent(this.container);
        const round = new roundComponent(this.container);
        const race = new RaceComponent(this.container);
    }
}