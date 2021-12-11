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
      set(state, key, value, receiver) {
        if (!Reflect.has(state, key)) throw Error(`This key(${key}) does not exist in the state.`);

        if (self.status !== STORE_STATUS.MUTATION) throw Error(`You should use a mutation to set ${key}`);

        console.log('prev-state:', key, Reflect.get(state, key, receiver));
        Reflect.set(state, key, value, receiver);
        console.log('next-state:', key, Reflect.get(state, key, receiver));

        self.events.publish('stateChange', self.state);

        self.status = STORE_STATUS.RESTING;
        self.state = new Proxy(params.state || {}, {
          set(state, key, value, receiver) {
            if (!Reflect.has(state, key)) throw Error(`This key(${key}) does not exist in the state.`);

            if (self.status !== STORE_STATUS.MUTATION) throw Error(`You should use a mutation to set ${key}`);

            console.log('prev-state:', key, Reflect.get(state, key, receiver));
            Reflect.set(state, key, value, receiver);
            console.log('next-state:', key, Reflect.get(state, key, receiver));

            self.events.publish('stateChange', self.state);

            self.status = STORE_STATUS.RESTING;

            return true;
          },
        });

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

    this.mutations[mutationKey](this.state, payload);
    this.events.publish(mutationKey, this.state);

    return true;
  }
}
