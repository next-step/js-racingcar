class MatchNumber {
  #matchNumber;

  setMatchNumber(matchNumber) {
    this.#matchNumber = matchNumber;
  }
  getMatchNumber() {
    return this.#matchNumber;
  }
}
export default new MatchNumber();
