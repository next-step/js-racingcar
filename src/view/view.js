import { readLineAsync } from "../utils/index.js";

class View {

  static async getCarNames() {
    try{
      const names = await readLineAsync("경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n");
      return names.split(",");
    } catch(error){
      console.error(error);
    }
  }

  static printRaceProgress(carName, position) {
    console.log(`${carName}: ${"-".repeat(position)}`);
    console.log();
  };

  static printRaceStart() {
    console.log("실행 결과");
  };

  static printWinners(winners) {
    const winnerNames = winners.map(winner => winner.name).join(", ");
    console.log(`${winnerNames}가 최종 우승했습니다.`);
  };
}

export default View;