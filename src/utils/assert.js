export function assert(condition, error) {
  if (!condition) {
    if (typeof error === "string") {
      throw new Error(error);
    }

    throw error;
  }
}
