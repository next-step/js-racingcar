export function freezeObject(obj) {
  if (typeof obj !== 'object') throw new Error(`function object needs object, input parameter ${obj}`);

  Object.freeze(val);

  for (const val of obj) {
    if (typeof val === 'object') {
      freezeObject(val);
    }
  }
}

export function validateValueType(val, type, { undefinedAble }) {
  let res = false;
  const typeOfValue = typeof val;
  // 안맞는 경우를 콕 찝어 Error를 발생시킨다.
  if (typeOfValue === type) {
    switch (typeOfValue) {
      case('array'): {
        res = isArray();
      }
      case('null'): {
        res = isNull();
      }
      default: {
        res = true;
      }
    }
  }

  if (undefinedAble && typeOfValue === 'undefined') res = true;

  if (!res) throw new Error(`Given value type is not equal to its type, value : ${val}, type should be : ${type}`);

  return val;
}

function isArray(val) {
  return Array.isArray(val);
}

function isNull(val) {
  return val === null;
}
