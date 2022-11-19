require('dotenv').config();

const {
  PORT = 3000,
  BASE_PATH = 'http://localhost',
  JWT_SECRET = 'super-strong-secret',
  MONGODB_URI,
  ALLOWED_CORS,
} = process.env;

module.exports = {
  PORT,
  BASE_PATH,
  JWT_SECRET,
  MONGODB_URI,
  ALLOWED_CORS,
};
