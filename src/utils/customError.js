export class CustomError extends Error {
  constructor(error) {
    super(error.message)

    this.message = error.message
    this.cause = error.cause
  }
}
