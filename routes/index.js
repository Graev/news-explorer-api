const router = require('express').Router();
const routerUsers = require('./users');
const routerArticles = require('./articles');
const {
  validateSignup,
  validateSignin,
} = require('../validator/requestValidation');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', validateSignup, createUser);
router.post('/signin', validateSignin, login);

router.use(auth);

router.use('/users', routerUsers);
router.use('/articles', routerArticles);

module.exports = router;
