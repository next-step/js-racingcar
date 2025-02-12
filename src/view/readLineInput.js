import readline from 'readline';

class ReadLineInput {
  async askCarNames() {
    return this.readLineAsync('자동차 이름을 입력하세요. \n');
  }

  async askRound() {
    const round = await this.readLineAsync('시도할 회수는 몇회인가요? \n');
    return Number(round);
  }

  // eslint-disable-next-line class-methods-use-this
  async readLineAsync(query) {
    return new Promise((resolve, reject) => {
      if (arguments.length !== 1) {
        reject(new Error('arguments must be 1'));
      }

      if (typeof query !== 'string') {
        reject(new Error('query must be string'));
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
}

export default ReadLineInput;
