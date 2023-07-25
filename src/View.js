import { MESSAGES } from "./constants/index.js"
import { print } from "./util/print.js"

export class CarView {
    printStart() {
        print(`\n${MESSAGES.RESULT}`)
    }

    printScore(key, value) {
        print(`${key} : ${'-'.repeat(value)}`)
    }

    printWinner(winner) {
        
        print(`${winner.join(', ')}${MESSAGES.FINISH}`)
    }
}