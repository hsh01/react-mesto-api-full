const jwt = require('jsonwebtoken');
const User = require('../users/models');
const { JWT_SECRET } = require('../config');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

      res.cookie('jwt', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ success: true });
    })
    .catch((err) => {
      if (err.name === 'WrongCredentialsError') {
        return next(err);
      }
      return next(err);
    });
};

module.exports.logout = (req, res) => res
  .clearCookie('jwt')
  .status(200)
  .json({ success: true });
