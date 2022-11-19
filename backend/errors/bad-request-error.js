class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.name = this.constructor.name;
  }
}

module.exports = BadRequestError;
