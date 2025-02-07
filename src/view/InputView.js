const readline = require("readline");
const Car = require("../domain/Car.js");

class InputView {
    async readLineAsync(query) {
        return new Promise((resolve, reject) => {
            if (arguments.length !== 1) {
                reject(new Error("arguments must be 1"));
            }

            if (typeof query !== "string") {
                reject(new Error("query must be string"));
            }

            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            rl.question(query, (input) => {
                rl.close();
                resolve(input);
            });
        });
    }

    async askCarName() {
        return this.readLineAsync("경주할 자동차 이름을 입력하세요.");
    }

    createCarsFromInput(input) {
        return input.split(",").map((name) => new Car(name.trim()));
    }
}

module.exports = InputView;
