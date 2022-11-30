export const withErrorHandling = function (fn) {
 return function () {
  if (fn.constructor.name == 'AsyncFunction') {
   return fn.apply(this, arguments).catch((e) => {
    alert(e.message);
   });
  }
  try {
   return fn.apply(this, arguments);
  } catch (e) {
   alert(e.message);
  }
 };
};
