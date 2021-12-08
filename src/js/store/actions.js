export default {
  /*
  context: actions, mutations, state, status, events(SubPub) ....
  payload: payload
   */
  setCarNames(context, payload) {
    context.commit('setCarNames', payload);
  },

  setTryCounts(context, payload) {
    context.commit('setTryCounts', payload);
  },

  setProcessMatrix(context, payload) {
    context.commit('setProcessMatrix', payload);
  },
};
