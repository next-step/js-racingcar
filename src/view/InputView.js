import readline from "readline";
import Car from "../domain/Car.js";
import {RandomAcceleration} from "../domain/Acceleration.js";

class InputView {
    async askCarNames() {
        return this.readLineAsync("경주할 자동차 이름을 입력하세요.\n").then((input) => {
            return input.split(",").map((name) => name.trim());
        });
    }

    async readLineAsync(query) {
        return new Promise((resolve, reject) => {
            if (arguments.length !== 1) {
                reject(new Error("arguments must be 1"));
            }

            if (typeof query !== "string") {
                reject(new Error("query must be string"));
            }

            const readLine = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            readLine.question(query, (input) => {
                readLine.close();
                resolve(input);
            });
        });
    }
}

export default InputView;
