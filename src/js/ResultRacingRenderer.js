import RacingInfoDomain from "./Domain/RacingInfoDomain.js";

class ResultRacingRenderer {
  #resultRacingview;
  #winner = { count: -1, name: [] };

  constructor(resultRacingview) {
    this.#resultRacingview = resultRacingview;
  }

  initRenderer() {
    for (let name in RacingInfoDomain.getRaceForwardCount()) {
      if (RacingInfoDomain.getRaceForwardCount()[name] > this.#winner.count) {
        this.#winner.count = RacingInfoDomain.getRaceForwardCount()[name];
        this.#winner.name = [name];
      } else if (
        RacingInfoDomain.getRaceForwardCount()[name] == this.#winner.count
      ) {
        this.#winner.name.push(name);
      }
    }
    this.#resultRacingview.resultView(this.#winner.name.join(","));
  }
}
export default ResultRacingRenderer;
