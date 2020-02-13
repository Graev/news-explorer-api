const routerUsers = require('express').Router();
const { validateUserId } = require('../validator/requestValidation');
const { getUserData } = require('../controllers/users');

routerUsers.get('/me', validateUserId, getUserData);

module.exports = routerUsers;
