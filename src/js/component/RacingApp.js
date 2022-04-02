import { CarNamesForm } from "./CarNamesForm.js";
import { TryCountForm } from "./TryCountForm.js";

export class RacingApp {
    constructor() {
        this.tryCountForm = new TryCountForm();
        this.carNamesForm = new CarNamesForm({
            onLoadTryForm: () => this.tryCountForm.toggleDisplay(),
        });
    }

    onLoadTryForm() {}
}
