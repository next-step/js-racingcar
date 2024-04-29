import { readLineAsync } from './utils';
import { Racing } from './domain/Racing';
import { renderRacingBoard, renderWinners } from './view/view';
const app = async () =>  {
    try {
        const carNames = await readLineAsync('경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n');
        const racing = new Racing(carNames);
        console.log(carNames)
        console.log("\n")
        console.log('실행 결과')

        while(racing.currentRound < Racing.MAX_ROUND) {
            racing.race();
            renderRacingBoard(racing.cars);
        }

        renderWinners(racing.winners);

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

app();