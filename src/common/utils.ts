export function id2Query(id: string) {
  return `#${id}`;
}

export function class2Query(className: string) {
  return `.${className}`;
}

export async function delay(ms: number) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(1);
    }, ms)
  );
}
