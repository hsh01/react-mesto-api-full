class InternalError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
    this.name = this.constructor.name;
  }
}

module.exports = InternalError;
