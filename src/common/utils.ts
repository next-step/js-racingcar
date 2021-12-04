export async function delay(ms: number) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(1);
    }, ms)
  );
}

export function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
