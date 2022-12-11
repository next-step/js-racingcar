import { NameComponent } from './components/nameComponent.js';
import { RoundComponent } from './components/roundComponent.js';
import { RaceComponent } from './components/race.component.js';

import { StateService } from "./services/state.service.js";

export class App {
    stateService;

    constructor() {
        this.stateService = StateService.getInstance();
    }

    init() {
        const nameComponent = new NameComponent(this.stateService);
        const roundComponent = new RoundComponent(this.stateService);
        const raceComponent = new RaceComponent(this.stateService);
    }
}