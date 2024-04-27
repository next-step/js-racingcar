import { readLineAsync } from "../utils/index.js";

class View {

  async getCarNames() {
    try{
      const names = await readLineAsync("경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).");
      return names.split(",");
    } catch(error){
      console.error(error);
    }
  }
}

export default View;