const express = require('express')
const UserController = require('../../controllers/user_controller');
const { UserValidation } = require('../../middlewares/index')
const router = express.Router();

router.post('/signup', UserValidation, UserController.createUser);
router.post('/login', UserValidation, UserController.signIn);
router.get('/isAuth', UserController.isAuthenticated);

module.exports = router;
