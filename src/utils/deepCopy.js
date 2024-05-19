function deepCopy(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const result = Array.isArray(obj) ? [] : {};

  Object.keys(obj).forEach((key) => {
    result[key] = deepCopy(obj[key]);
  });

  return result;
}

export default deepCopy;
