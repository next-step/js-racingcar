import {MESSAGES, STORE_STATUS, EVENTS} from '../constants.js'
import PubSub from "../lib/pubsub.js";

export default class Store {
  constructor(params) {
    this.actions = {};
    this.mutations = {};
    this.state = {};
    this.status = STORE_STATUS.RESTING;

    this.events = new PubSub();

    if (params.hasOwnProperty('actions')) this.actions = params.actions;
    if (params.hasOwnProperty('mutations')) this.mutations = params.mutations;

    this.state = new Proxy((params.state || {} ), {
      set: function (state, key, value) {
        state[key] = value;

        console.log(`state-change: ${key}: ${value}`);

        this.events.publish(EVENTS.STATE_CHANGE, this.state);
        if (this.status !== STORE_STATUS.MUTATION) console.warn(MESSAGES.SHOULD_USE_MUTATION);
        this.status = STORE_STATUS.RESTING;
      }
    })
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

    if(typeof this.mutations[mutationKey] !== 'function') {
      console.log(`Mutation "${mutationKey}" doesn't exist`);
      return false;
    }

    this.status = 'mutation';
    this.state = Object.assign(this.state,
      this.mutations[mutationKey](this.state, payload));

    return true;
  }
}