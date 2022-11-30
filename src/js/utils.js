export const withErrorHandling = function (fn) {
 return function () {
  try {
   return fn.apply(this, arguments);
  } catch (e) {
   alert(e.message);
  }
 };
};
