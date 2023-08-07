export const runSafelyFunc = (func, ...args) => {
  try {
    return func(...args);
  } catch (error) {
    console.error(error);
  }
};
