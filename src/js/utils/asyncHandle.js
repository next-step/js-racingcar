export const debounceFrame = (callback) => {
  let currentCallback = -1;
  return () => {
    cancelAnimationFrame(currentCallback);
    currentCallback = requestAnimationFrame(callback);
  };
};

export const waitUntil = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
