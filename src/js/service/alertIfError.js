/* eslint-disable arrow-body-style */
export const alertIfError = callback => {
  return (...args) => {
    try {
      return callback(...args);
    } catch (error) {
      alert(error.message);
      return false;
    }
  };
};
