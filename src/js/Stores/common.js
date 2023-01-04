export function freezeObject(obj) {
  if (typeof obj !== 'object') throw new Error(`function object needs object, input parameter ${obj}`);

  Object.freeze(obj);

  for (const key in obj) {
    const val = obj[key];
    if (typeof val === 'object') {
      freezeObject(val);
    }
  }
}

export function validateValueType(val, type, options) {
  const typeOfValue = typeof val;
  if (!options?.noUndefined && typeOfValue === 'undefined') return true;

  let result = typeOfValue === type;
  if (!result) {
    switch (type) {
      case('array'): {
        result = isArray(val);
        break;
      }
      case('null'): {
        result = isNull(val);
        break;
      }
      default: {
        result = true;
      }
    }
  }

  if (!result) throw new Error(`Given value type is not equal to its type, value : ${val}, type should be : ${type}`);

  return result;
}

function isArray(val) {
  return Array.isArray(val);
}

function isNull(val) {
  return val === null;
}
