const { Joi } = require('celebrate');

const UserAuthSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  UserAuthSchema,
};
