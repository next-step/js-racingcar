import { SettingComponent } from "./components/setting.component.js";
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
        const settingController = new SettingComponent(this.container);
    }
}