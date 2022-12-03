import { nameComponent } from "./components/nameComponent.js";
import { roundComponent } from "./components/roundComponent.js";
import { Validator } from "./common/validator.js";
import { View } from "./views/view.js";
import stateService from "./services/state.service.js";

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
        const settingComponent = new nameComponent(this.container);
        const raceTurnComponent = new roundComponent(this.container);
    }
}