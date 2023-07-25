import { NUMBER_OF_MATCHES, ZERO } from "../constants";

class Race {
  totalMatches;
  currentMatches;

  constructor() {
    this.totalMatches = NUMBER_OF_MATCHES;
    this.currentMatches = ZERO;
  }
}

export default Race;
