import RacingInfoDomain from "./RacingInfoDomain.js";

class ResultRacingDomain {
  #resultRacingview;
  #winner = { count: -1, name: [] };

  constructor(resultRacingview) {
    this.#resultRacingview = resultRacingview;
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
    this.#resultRacingview.resultRenderer(this.#winner.name.join(","));
  }
}
export default ResultRacingDomain;
