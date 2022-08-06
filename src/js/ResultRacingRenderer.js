class ResultRacingRenderer {
  #resultRacingview;
  constructor(resultRacingview) {
    this.#resultRacingview = resultRacingview;
  }

  initRenderer() {
    this.#resultRacingview.initView();
  }
}
export default ResultRacingRenderer;
