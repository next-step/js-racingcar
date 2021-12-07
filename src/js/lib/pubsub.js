export default class PubSub {
  constructor() {
    this.events = {};
  }

  /**
   * @param {string} event
   * @param {function} callback
   * @returns {number}
   * @memberof PubSub
   */
  subscribe(event, callback) {
    if (!this.events.hasOwnProperty(event)) this.events[event] = [];
    return this.events[event].push(callback);
  }

  /**
   * @param {string} event
   * @param {object} [data={}]
   * @returns {array}
   * @memberof PunSub
   */
  publish(event, data = {}) {
    if (!this.events.hasOwnProperty(event)) return [];
    return this.events[event].map(callback => callback(data));
  }
};