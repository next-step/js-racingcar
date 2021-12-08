export default {
  /*
  context: actions, mutations, state, status, events(SubPub) ....
  payload: payload
   */
  setCarNames(context, payload) {
    context.commit('setCarNames', payload);
  },
};