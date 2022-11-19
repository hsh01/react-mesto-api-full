const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  getUser, getUsers, setProfile, setAvatar, getMe,
} = require('../controllers/users');
const { UserProfileSchema, UserAvatarSchema, UserIdParamSchema } = require('../schemas/user');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', celebrate(UserIdParamSchema), getUser);
router.patch('/me', celebrate(UserProfileSchema), setProfile);
router.patch('/me/avatar', celebrate(UserAvatarSchema), setAvatar);

module.exports = router;
