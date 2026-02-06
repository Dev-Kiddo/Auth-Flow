class AppError extends Error {
  //   public statusCode: number;

  constructor(
    message: string,
    public statusCode: number,
  ) {
    super(message);
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, new.target.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
