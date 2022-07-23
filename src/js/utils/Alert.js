export class Alert extends Error {
  constructor(message) {
    super(message);
  }
}

export const alertError = (error, cb, alert = window.alert) => {
  if (error instanceof Alert) {
    alert(error.message);
    if (typeof cb === "function") cb();
  } else {
    throw error;
  }
};
