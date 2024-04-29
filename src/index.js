import readline from "./readline.js";
import InputOutput from '../src/domain/InputOutput';
import Race from '../src/domain/Race';

async function app() {
  try {
    const start = await readline.readLineAsync('경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n');
    const input = new InputOutput(start);
    const race = new Race(input);
    race.start();
    race.winner();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

app();
// pobi,crong,honux