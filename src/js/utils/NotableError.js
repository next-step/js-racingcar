export class NotableError extends Error {
  constructor(message) {
    super(message);
  }
}

export const noticeError = (error, cb, alert = window.alert) => {
  if (error instanceof NotableError) {
    alert(error.message);
    if (typeof cb === "function") cb();
  } else {
    throw error;
  }
};
