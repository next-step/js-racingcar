export const debounceFrame = (callback) => {
  let currentCallback = -1;
  return () => {
    cancelAnimationFrame(currentCallback);
    currentCallback = requestAnimationFrame(callback);
  };
};

export const splitingCarNames = (carNames) => {
  const copyName = carNames;

  if (!carNames.length) return [];
  return copyName.split(',').filter((name) => name.trim());
};

export const makeRandomNumber = (minValue = 0, maxValue = 9) => {
  return Math.floor(Math.random() * maxValue + minValue);
};

export const waitUntil = (delay) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export const deepDiffMapper = () => {
  //*Reference: https://stackoverflow.com/questions/8572826/generic-deep-diff-between-two-objects
  let UPDATE_COUNT = 0;
  return {
    VALUE_CREATED: 'created',
    VALUE_UPDATED: 'updated',
    VALUE_DELETED: 'deleted',
    VALUE_UNCHANGED: 'unchanged',
    check: function (obj1, obj2) {
      if (this.isFunction(obj1) || this.isFunction(obj2)) {
        throw 'Invalid argument. Function given, object expected.';
      }
      if (this.isValue(obj1) || this.isValue(obj2)) {
        return {
          diff: {
            type: this.compareValues(obj1, obj2),
            data: obj1 === undefined ? obj2 : obj1,
          },
          isDiff: UPDATE_COUNT > 0,
          updateCount: UPDATE_COUNT,
        };
      }

      const diff = {};
      for (const key in obj1) {
        if (this.isFunction(obj1[key])) {
          continue;
        }

        let value2 = undefined;
        if (obj2[key] !== undefined) {
          value2 = obj2[key];
        }

        diff[key] = this.check(obj1[key], value2).diff;
      }
      for (const key in obj2) {
        if (this.isFunction(obj2[key]) || diff[key] !== undefined) {
          continue;
        }

        diff[key] = this.check(undefined, obj2[key]).diff;
      }

      return { diff, isDiff: UPDATE_COUNT > 0, updateCount: UPDATE_COUNT };
    },
    compareValues: function (value1, value2) {
      if (value1 === value2) {
        return this.VALUE_UNCHANGED;
      }
      if (
        this.isDate(value1) &&
        this.isDate(value2) &&
        value1.getTime() === value2.getTime()
      ) {
        return this.VALUE_UNCHANGED;
      }
      if (value1 === undefined) {
        UPDATE_COUNT += 1;
        return this.VALUE_CREATED;
      }
      if (value2 === undefined) {
        UPDATE_COUNT += 1;
        return this.VALUE_DELETED;
      }

      UPDATE_COUNT += 1;
      return this.VALUE_UPDATED;
    },
    isFunction: function (x) {
      return Object.prototype.toString.call(x) === '[object Function]';
    },
    isArray: function (x) {
      return Object.prototype.toString.call(x) === '[object Array]';
    },
    isDate: function (x) {
      return Object.prototype.toString.call(x) === '[object Date]';
    },
    isObject: function (x) {
      return Object.prototype.toString.call(x) === '[object Object]';
    },
    isValue: function (x) {
      return !this.isObject(x) && !this.isArray(x);
    },
  };
};

export default {
  splitingCarNames,
  makeRandomNumber,
  waitUntil,
  deepDiffMapper,
};
