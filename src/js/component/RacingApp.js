import { Racing } from "../domain/Racing.js";
import { CarNamesForm } from "./CarNamesForm.js";
import { CarTrackForm } from "./CarTrackForm.js";
import { TryCountForm } from "./TryCountForm.js";

export class RacingApp {
    constructor() {
        this.racing = new Racing();

        this.carNamesForm = new CarNamesForm(this.racing, {
            onLoadTryForm: () => this.tryCountForm.display(),
        });
        this.tryCountForm = new TryCountForm(this.racing, {
            onLoadCarTrackForm: () => this.carTrackForm.initialize(),
        });
        this.carTrackForm = new CarTrackForm(this.racing);
    }

    onLoadTryForm() {}
}
