import RacingInfoDomain from "./RacingInfoDomain.js";

class ResultRacingDomain {
  #resultRacingRenderer;
  #winner = { count: -1, name: [] };

  constructor(resultRacingRenderer) {
    this.#resultRacingRenderer = resultRacingRenderer;
  }

  resultRacing() {
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
    this.#resultRacingRenderer.resultRenderer(this.#winner.name.join(","));
  }
}
export default ResultRacingDomain;
