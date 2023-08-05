import {Console} from "../util/Console";

class RacingGameInputView {
    readCarNamesInput() {
        return new Promise((resolve, _) => {
            Console.readLine(
                "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).",
                (userInput) => {
                    resolve(userInput);
                }
            );
        });
    }

    readRacingGameSizeInput() {
        return new Promise((resolve, _) => {
            Console.readLine(
                "시도할 회수는 몇회인가요?",
                (userInput) => {
                    resolve(userInput);
                }
            );
        });
    }
}

export default RacingGameInputView;