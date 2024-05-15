class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    // Set the prototype explicitly to restore the correct chain
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export const throwError = (
  statusCode = 500,
  message = 'Server Error Occured.'
) => {
  const error = new CustomError(message, statusCode);
  throw error;
};
