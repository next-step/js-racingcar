import InputView from "./InputView.js";

class ConsoleIO {
    constructor() {
        this.inputView = new InputView();
    }

    async askCarNames() {
        return this.inputView.askCarName();
    }
}

module.exports = ConsoleIO;
