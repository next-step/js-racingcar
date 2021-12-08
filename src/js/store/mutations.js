const validateCarName = () => {

};

export default {
  /*
  state: state 정보
  payload: payload
  */
  setCarNames(state, {carNames}) {
    if ([...new Set(carNames)].length !== carNames.length) throw Error('중복된 값이 있습니다.');
    this.state = carNames.map(carName => {
      validateCarName(carName);
      return carName.trim();
    });
  },

  setTryCounts(state, {tryCounts}) {

  }
};