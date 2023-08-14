
export const runSafelyFunc = async (func, ...args) => {
  try {
    return await func(...args);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
