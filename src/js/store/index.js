import actions from './actions.js';
import mutations from './mutations.js';
import initialState from './initialState.js';
import Store from './store.js';

export default new Store({
  actions,
  mutations,
  initialState
});