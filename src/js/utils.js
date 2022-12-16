export const withErrorHandling = function (fn) {
  return async function () {
    try {
      await fn.apply(this, arguments);
    } catch (err) {
      alert(err.message);
    }
  };
};
