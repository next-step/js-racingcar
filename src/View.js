import readline from "readline";

export class View {
  static async readLine(message) {
    return await readLineAsync(message);
  }

  static printRound(count) {
    console.log("\n");
    console.log(count + "회차\n");
  }

  static printRecord(car, record) {
    // console.log(car.getName() + " : ");
    process.stdout.write(car.getName() + " : ");
    process.stdout.write("-".repeat(record));
    console.log("\n");
  }

  static printWinner(winners) {
    const winner = winners.join(", ");
    console.log(winner + " 가 최종 우승했습니다.\n");
  }
}

function readLineAsync(query) {
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
