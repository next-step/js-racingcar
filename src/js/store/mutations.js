export default {
  /*
  state: state 정보
  payload: payload
  */

  setCarNames(state, payload) {
    console.log('payload:', payload);
    state.carNames = ['a', 'b', 'c'];
  }
};