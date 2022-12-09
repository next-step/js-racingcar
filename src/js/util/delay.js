export const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

/**
 *
 * @param {number} milliseconds
 * @returns
 */
export const lazyStart = async (callback, milliseconds) => {
  await sleep(milliseconds);
  callback();
};
