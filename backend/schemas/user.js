const { Joi } = require('celebrate');

const UserAuthSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const UserCreateSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^https?:\/\/[-._~:/?#[\]!$&'()*+,;=\w\d]+$/i),
  }),
};

const UserProfileSchema = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
};

const UserAvatarSchema = {
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^https?:\/\/[-._~:/?#[\]!$&'()*+,;=\w\d]+$/i),
  }),
};

const UserIdParamSchema = {
  params: Joi.object().keys({
    userId: Joi.string().required().hex().alphanum()
      .length(24),
  }),
};

module.exports = {
  UserAuthSchema, UserProfileSchema, UserAvatarSchema, UserCreateSchema, UserIdParamSchema,
};
