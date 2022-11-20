const router = require('express').Router();
const { celebrate } = require('celebrate');
const { UserCreateSchema } = require('../users/schemas');
const { login, logout } = require('./services');
const { UserAuthSchema } = require('./schemas');
const { createUser } = require('../users/services');

router.post('/signin', celebrate(UserAuthSchema), login);
router.post('/signup', celebrate(UserCreateSchema), createUser);
router.post('/signout', logout);

module.exports = router;
