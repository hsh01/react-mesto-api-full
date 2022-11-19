const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  createUser, login, logout,
} = require('../controllers/users');
const { UserAuthSchema, UserCreateSchema } = require('../schemas/user');

router.post('/signin', celebrate(UserAuthSchema), login);
router.post('/signup', celebrate(UserCreateSchema), createUser);
router.post('/signout', logout);

module.exports = router;
