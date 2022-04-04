export function wait(waitingTime) {
  return new Promise((resolve) => setTimeout(() => resolve(), waitingTime));
}
