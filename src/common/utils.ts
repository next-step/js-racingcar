export async function delay(ms: number) {
  const startTime = Date.now();
  return new Promise((resolve) => {
    const callback = () => {
      if (Date.now() - ms > startTime) {
        resolve(1);
      } else {
        requestAnimationFrame(callback);
      }
    };
    requestAnimationFrame(callback);
  });
}

export function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
