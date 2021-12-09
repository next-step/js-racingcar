import PubSub from '../lib/pubsub.js';
import { STORE_STATUS } from '../constants.js';

export default class Store {
  constructor(params) {
    const self = this;

    self.actions = {};
    self.mutations = {};
    self.state = {};

    self.status = STORE_STATUS.RESTING;
    self.events = new PubSub();

    if (params.hasOwnProperty('actions')) self.actions = params.actions;
    if (params.hasOwnProperty('mutations')) self.mutations = params.mutations;

    self.state = new Proxy(params.state || {}, {
      set(state, key, value) {
        console.log('prev-state:', key, state[key]);
        state[key] = value;
        console.log('next-state:', key, state[key]);

        self.events.publish('stateChange', self.state);

        if (self.status !== STORE_STATUS.MUTATION)
          console.warn(`You should use a mutation to set ${key}`);

        self.status = STORE_STATUS.RESTING;

        return true;
      },
    });
  }

  /**
   * @param actionKey
   * @param payload
   * @returns {boolean}
   * @memberof Store
   */
  dispatch(actionKey, payload) {
    if (typeof this.actions[actionKey] !== 'function') {
      console.error(`Action "${actionKey} doesn't exist.`);
      return false;
    }

    console.groupCollapsed(`ACTION: ${actionKey}`);
    this.status = STORE_STATUS.ACTION;
    this.actions[actionKey](this, payload);
    console.groupEnd();

    return true;
  }

  /**
   * @param mutationKey
   * @param payload
   * @returns {boolean}
   * @memberOf Store
   */
  commit(mutationKey, payload) {
    if (typeof this.mutations[mutationKey] !== 'function') {
      console.log(`Mutation "${mutationKey}" doesn't exist`);
      return false;
    }

    this.status = STORE_STATUS.MUTATION;

    self.mutations[mutationKey](self.state, payload);
    self.events.publish(mutationKey, self.state);

    return true;
  }
}
