import RacingCarInfo from "./state/RacingCarInfo.js";

class ResultRacingRenderer {
  #resultRacingview;
  #winner = { count: -1, name: [] };

  constructor(resultRacingview) {
    this.#resultRacingview = resultRacingview;
  }

  initRenderer() {
    for (let name in RacingCarInfo.getRaceForwardCount()) {
      if (RacingCarInfo.getRaceForwardCount()[name] > this.#winner.count) {
        this.#winner.count = RacingCarInfo.getRaceForwardCount()[name];
        this.#winner.name = [name];
      } else if (
        RacingCarInfo.getRaceForwardCount()[name] == this.#winner.count
      ) {
        this.#winner.name.push(name);
      }
    }
    this.#resultRacingview.resultView(this.#winner.name.join(","));
  }
}
export default ResultRacingRenderer;
