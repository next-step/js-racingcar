import PubSub from '../lib/pubsub.js';

export default class Store {
  constructor(params) {
    const self = this;

    self.actions = {};
    self.mutations = {};
    self.state = {};

    self.status = 'resting';
    self.events = new PubSub();

    if (params.hasOwnProperty('actions')) self.actions = params.actions;
    if (params.hasOwnProperty('mutations')) self.mutations = params.mutations;

    self.state = new Proxy(params.state || {}, {
      set(state, key, value) {
        console.log('prev-state:', key, state[key]);
        state[key] = value;
        console.log('next-state:', key, state[key]);
        self.events.publish('stateChange', self.state);

        if (self.status !== 'mutation')
          console.warn(`You should use a mutation to set ${key}`);
        self.status = 'resting';

        return true;
      }
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
    this.status = 'action';
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

    this.status = 'mutation';
    this.state = Object.assign(
      this.state,
      this.mutations[mutationKey](this.state, payload)
    );

    return true;
  }
}
