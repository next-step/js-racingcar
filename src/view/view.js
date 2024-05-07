import { MINIMUM_CAR_NAME_LENGTH } from "../constants/index.js";
import { readLineAsync } from "../utils/index.js";

const View = {

  async getCarNames() {
    try{
      const names = await readLineAsync("경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n");
      if(this.validates(names)) return names;
    } catch(error){
      console.error(error);
    }
  },

  printRaceProgress(carName, position) {
    console.log(`${carName}: ${"-".repeat(position)}`);
    console.log();
  },

  printRaceStart() {
    console.log("실행 결과");
  },

  printWinners(winners) {
    const winnerNames = winners.map(winner => winner.name).join(", ");
    console.log(`${winnerNames}가 최종 우승했습니다.`);
  },

  isValidCarAmount(names){
    return !!names
  },

  isValidCarDuplication(names){
    return names.split(",").length === new Set(names.split(",")).size;
  },

  isValidCarNameLength(names){
    return names.split(",").every(name => name.trim().length >= MINIMUM_CAR_NAME_LENGTH);
  },

  validates(names){
    if(!this.isValidCarAmount(names)) throw new Error("자동차가 존재하지 않습니다.");
    if(!this.isValidCarDuplication(names)) throw new Error("중복된 자동차가 존재합니다.");
    if(!this.isValidCarNameLength(names)) throw new Error("자동차 이름은 최소 1자 이상입니다.");
    return true;
  },

}

export default View;